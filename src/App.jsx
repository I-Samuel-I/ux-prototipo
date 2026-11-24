import React,{useEffect} from 'react';
import {useApp,Link} from './context';
import Shell from './components/Shell';
import {Toast,EmptyState} from './components/ui';
import Landing from './pages/Landing';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Candidates from './pages/Candidates';
import JobForm from './pages/JobForm';
import JobDetail from './pages/JobDetail';
import Agenda from './pages/Agenda';
import Profile from './pages/Profile';
import About from './pages/About';

const titles={'/':'seu próximo passo começa aqui','/painel':'Visão geral','/candidaturas':'Minhas candidaturas','/candidaturas/nova':'Nova candidatura','/agenda':'Minha agenda','/historico':'Meu histórico','/perfil':'Meu perfil','/sobre':'A pesquisa e o protótipo','/entrar':'Entre no seu espaço','/cadastro':'Crie seu espaço','/recuperar-senha':'Recuperar senha','/primeiros-passos':'Primeiros passos'};
export default function App(){
  const {path}=useApp();const route=path.split('?')[0].replace(/\/$/,'')||'/';
  useEffect(()=>{document.title=`elo — ${titles[route]||'Sua candidatura'}`;},[route]);
  let page;let publicPage=false;
  if(route==='/'){page=<Landing/>;publicPage=true;}
  else if(['/entrar','/cadastro','/recuperar-senha','/primeiros-passos'].includes(route)){page=<Account mode={{'/entrar':'login','/cadastro':'register','/recuperar-senha':'forgot','/primeiros-passos':'onboarding'}[route]} key={route}/>;publicPage=true;}
  else if(route==='/painel')page=<Dashboard/>;
  else if(route==='/candidaturas')page=<Candidates key={path}/>;
  else if(route==='/candidaturas/nova')page=<JobForm/>;
  else if(/^\/candidaturas\/[^/]+\/editar$/.test(route))page=<JobForm id={route.split('/')[2]} key={route}/>;
  else if(/^\/candidaturas\/[^/]+$/.test(route))page=<JobDetail id={route.split('/')[2]} key={route}/>;
  else if(route==='/agenda')page=<Agenda/>;
  else if(route==='/historico')page=<Candidates archived key="archive"/>;
  else if(route==='/perfil')page=<Profile/>;
  else if(route==='/sobre')page=<About/>;
  else page=<EmptyState title="Esse caminho ainda não existe." description="Mas tem muita coisa para explorar no seu espaço." action={<Link className="button button-primary" to="/painel">Voltar ao painel</Link>}/>;
  return <>{publicPage?page:<Shell>{page}</Shell>}<Toast/></>;
}
