import React, {useEffect,useRef,useState} from 'react';
import {Link,useApp} from '../context';
import {stageClass,uid,localDate} from '../data';
import {X, CalendarDays, Check, Link2, Inbox} from './icons';

export function Brand({light=false,compact=false}) {
  return <Link to="/" className={`brand ${light?'brand-light':''}`} aria-label="elo, página inicial"><span className="brand-symbol"><Link2 strokeWidth={3}/></span>{!compact&&<span>elo<span className="brand-period">.</span></span>}</Link>;
}
export function PageHeading({eyebrow,title,description,children}) {
  return <div className="page-heading"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description&&<p className="page-description">{description}</p>}</div>{children&&<div className="heading-actions">{children}</div>}</div>;
}
export function CompanyMark({name='',className=''}) {return <span className={`company-mark company-${name.toLowerCase().replace(/[^a-z]/g,'').slice(0,5)} ${className}`} aria-hidden="true">{name==='Órbita'?<span className="orbit-mark">o</span>:name==='Lume'?'l.':name==='Nuvem'?'n~':name==='Verde'?'v':name==='Studio Forma'?'f':name.slice(0,1).toLowerCase()}</span>;}
export function Status({stage}) {return <span className={`status status-${stageClass(stage)}`}>{stage}</span>;}
export function IconBadge({children,color=''}) {return <span className={`icon-badge ${color}`}>{children}</span>;}
export function EmptyState({title,description,action}) {return <div className="empty-state"><span><Inbox size={30}/></span><h3>{title}</h3><p>{description}</p>{action}</div>;}
export function Modal({title,description,children,onClose,wide=false}) {
  const ref=useRef(null);const previous=useRef(document.activeElement);
  useEffect(()=>{
    const bodyOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    const items=()=>ref.current?.querySelectorAll('button,a,input,select,textarea,[tabindex="0"]');
    items()?.[0]?.focus();
    const handle=event=>{if(event.key==='Escape')onClose();if(event.key==='Tab'){const els=items();const first=els?.[0],last=els?.[els.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}};
    document.addEventListener('keydown',handle);return()=>{document.body.style.overflow=bodyOverflow;document.removeEventListener('keydown',handle);previous.current?.focus?.();};
  },[]);
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section ref={ref} className={`modal ${wide?'modal-wide':''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><h2 id="modal-title">{title}</h2>{description&&<p>{description}</p>}</div><button className="icon-button" aria-label="Fechar janela" onClick={onClose}><X size={21}/></button></div>{children}</section></div>;
}
export function EventModal({onClose,jobId='',event,initialDate}) {
  const {jobs,addEvent,updateEvent,deleteEvent}=useApp();
  const [values,setValues]=useState(event||{title:'',jobId,company:jobs.find(j=>j.id===jobId)?.company||'',date:initialDate||localDate(),time:'14:00',type:'Entrevista',note:''});
  const field=(key,value)=>setValues(prev=>({...prev,[key]:value,...(key==='jobId'?{company:jobs.find(j=>j.id===value)?.company||''}:{})}));
  function submit(e){e.preventDefault();if(event)updateEvent(event.id,values);else addEvent(values);onClose();}
  return <Modal onClose={onClose} title={event?'Editar compromisso':'Espaço para o próximo passo'} description="Registre uma data importante e encontre tudo na sua agenda."><form onSubmit={submit} className="form-stack"><label>Título do compromisso<input required autoComplete="off" value={values.title} onChange={e=>field('title',e.target.value)} placeholder="Ex.: Conversa com a equipe de design" maxLength={100}/></label><div className="form-grid"><label>Candidatura<select value={values.jobId} onChange={e=>field('jobId',e.target.value)}><option value="">Sem candidatura vinculada</option>{jobs.map(j=><option key={j.id} value={j.id}>{j.company} · {j.role}</option>)}</select></label><label>Tipo<select value={values.type} onChange={e=>field('type',e.target.value)}>{['Entrevista','Teste','Lembrete'].map(t=><option key={t}>{t}</option>)}</select></label><label>Data<input type="date" required value={values.date} onChange={e=>field('date',e.target.value)}/></label><label>Horário<input type="time" required value={values.time} onChange={e=>field('time',e.target.value)}/></label></div><label>Anotações <span className="optional">opcional</span><textarea rows={3} value={values.note} onChange={e=>field('note',e.target.value)} placeholder="Link da reunião, o que preparar…"/></label><p className="form-hint"><CalendarDays size={16}/> Os lembretes aparecem aqui na demonstração. Não há envio de notificações.</p><div className="modal-actions">{event&&<button type="button" className="button button-danger" onClick={()=>{deleteEvent(event.id);onClose();}}>Excluir</button>}<button className="button button-ghost" type="button" onClick={onClose}>Cancelar</button><button className="button button-primary" type="submit"><Check size={17}/>{event?'Salvar alterações':'Adicionar compromisso'}</button></div></form></Modal>;
}
export function Toast() {const {toast,dismissToast}=useApp();return toast?<div className="toast" role="status"><span className="toast-check"><Check size={18}/></span><p>{toast.message}</p><button onClick={dismissToast} aria-label="Fechar mensagem"><X size={17}/></button></div>:null;}
