import React, {createContext, useContext, useEffect, useState} from 'react';
import {defaultProfile, makeDemo, uid, localDate} from './data';

const AppContext = createContext(null);
function useStored(key, initial, validate) {
  const [value,setValue] = useState(() => {
    try {const parsed = JSON.parse(localStorage.getItem(key)); if(parsed && validate(parsed)) return parsed;} catch { /* Storage can be unavailable in private mode. */ }
    return typeof initial === 'function' ? initial() : initial;
  });
  useEffect(() => {try {localStorage.setItem(key,JSON.stringify(value));} catch { /* The prototype remains usable in memory. */ }},[key,value]);
  return [value,setValue];
}
export function AppProvider({children}) {
  const [path,setPath] = useState(window.location.pathname + window.location.search);
  const [jobs,setJobs] = useStored('elo-jobs-v1',()=>makeDemo().jobs,Array.isArray);
  const [events,setEvents] = useStored('elo-events-v1',()=>makeDemo().events,Array.isArray);
  const [profile,setProfile] = useStored('elo-profile-v1',defaultProfile,v => typeof v.name === 'string');
  const [toast,setToast] = useState(null);
  useEffect(() => {
    const onPop = () => {setPath(window.location.pathname + window.location.search);window.scrollTo(0,0);};
    window.addEventListener('popstate',onPop);return () => window.removeEventListener('popstate',onPop);
  },[]);
  useEffect(() => {if(!toast)return;const t=setTimeout(()=>setToast(null),4500);return()=>clearTimeout(t);},[toast]);
  const navigate = to => {if(to !== path)window.history.pushState({},'',to);setPath(to);window.scrollTo({top:0,behavior:'instant'});};
  const notify = message => setToast({message,id:Date.now()});
  const addJob = values => {
    const record = {...values,id:uid(),updatedAt:localDate(),history:[{id:uid(),date:localDate(),title:'Candidatura registrada',body:`Registro manual · ${values.source}`} ]};
    setJobs(prev=>[record,...prev]);notify('Candidatura adicionada. Mais um passo dado!');return record.id;
  };
  const updateJob = (id,patch) => setJobs(prev=>prev.map(job => {
    if(job.id!==id)return job;
    const history = patch.stage && patch.stage!==job.stage ? [...job.history,{id:uid(),date:localDate(),title:`Etapa atualizada: ${patch.stage}`,body:'Atualização manual registrada por você.'}] : (patch.history || job.history);
    return {...job,...patch,updatedAt:localDate(),history};
  }));
  const addEvent = values => {const record={...values,id:uid(),done:false};setEvents(prev=>[...prev,record]);notify('Compromisso adicionado à sua agenda.');return record.id;};
  const updateEvent = (id,patch) => {setEvents(prev=>prev.map(e=>e.id===id?{...e,...patch}:e));notify(patch.done===true?'Compromisso concluído. Bom trabalho!':'Compromisso atualizado.');};
  const deleteEvent = id => {setEvents(prev=>prev.filter(e=>e.id!==id));notify('Compromisso removido.');};
  const resetDemo = () => {const data=makeDemo();setJobs(data.jobs);setEvents(data.events);setProfile(defaultProfile);notify('Demonstração restaurada. Tudo pronto para recomeçar.');};
  return <AppContext.Provider value={{path,navigate,jobs,setJobs,events,setEvents,profile,setProfile,toast,notify,dismissToast:()=>setToast(null),addJob,updateJob,addEvent,updateEvent,deleteEvent,resetDemo}}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
export function Link({to,children,onClick,...props}) {
  const {navigate} = useApp();
  return <a href={to} {...props} onClick={event=>{onClick?.(event);if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;event.preventDefault();navigate(to);}}>{children}</a>;
}
