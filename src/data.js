export const STAGES = ['Enviada', 'Em análise', 'Entrevista', 'Teste', 'Proposta', 'Contratado', 'Encerrada'];
export const SOURCES = ['LinkedIn', 'Gupy', 'Indeed', 'InfoJobs', 'Site da empresa', 'Indicação', 'E-mail', 'WhatsApp', 'Outro'];
export const uid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export function localDate(offset = 0) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function formatDate(value, options = {}) {
  if (!value) return 'Sem data';
  return new Date(`${value.slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', ...options });
}
export const isActive = job => !['Contratado', 'Encerrada'].includes(job.stage);
export const stageClass = stage => ({'Enviada':'sent','Em análise':'review','Entrevista':'interview','Teste':'test','Proposta':'offer','Contratado':'hired','Encerrada':'closed'}[stage] || 'sent');
export function makeDemo() {
  const records = [
    ['orbita', 'Órbita', 'Product Designer Jr.', 'Entrevista', 'LinkedIn', 'Remoto', 'R$ 4.000 – R$ 5.500', -9, 'Marina Costa', 'marina@orbita.example', 'Conversa com a equipe de design. Separar dois projetos do portfólio para apresentar.'],
    ['lume', 'Lume', 'UX/UI Designer', 'Teste', 'Gupy', 'Híbrido · Fortaleza', 'R$ 4.500 – R$ 6.000', -6, 'Rafael Lima', 'rafael@lume.example', 'Desafio: repensar a experiência de cadastro. Reservar um tempo para revisar a entrega.'],
    ['nuvem', 'Nuvem', 'Assistente de Produto', 'Em análise', 'Site da empresa', 'Remoto', 'A combinar', -4, '', '', 'Currículo e portfólio enviados pelo site da empresa.'],
    ['forma', 'Studio Forma', 'Designer de Interfaces', 'Enviada', 'LinkedIn', 'Remoto', 'R$ 3.500 – R$ 5.000', -2, '', '', 'A vaga pede familiaridade com Figma e design systems.'],
    ['ponto', 'Ponto', 'Estágio em UX Research', 'Enviada', 'Indicação', 'Presencial · Fortaleza', 'R$ 1.800', -1, 'Ana Souza', 'ana@ponto.example', 'Indicação de uma colega da faculdade.'],
    ['verde', 'Verde', 'Designer de Produto Jr.', 'Proposta', 'Indeed', 'Remoto', 'R$ 4.800', -14, 'Camila Rocha', 'camila@verde.example', 'Analisar a proposta, benefícios e horário antes de responder.'],
    ['atlas', 'Atlas', 'Analista de Experiência', 'Encerrada', 'LinkedIn', 'Híbrido · Fortaleza', 'A combinar', -24, '', '', 'A empresa seguiu com outro perfil. Manter o contato para próximas oportunidades.'],
  ];
  const jobs = records.map(([id,company,role,stage,source,modality,salary,offset,contact,contactEmail,notes], i) => ({id, company, role, stage, source, modality, salary, date:localDate(offset), updatedAt:localDate(-i % 3), url:'', contact,contactEmail,notes, history:[{id:`h-${id}-1`,date:localDate(offset),title:'Candidatura registrada',body:`Registro manual · ${source}`}, ...(stage !== 'Enviada' ? [{id:`h-${id}-2`,date:localDate(-i % 3),title:`Etapa atualizada: ${stage}`,body:'Atualização registrada por você.'}]:[])]}));
  const events = [
    {id:'evt-orbita',title:'Conversa com a equipe de design',company:'Órbita',jobId:'orbita',date:localDate(0),time:'14:00',type:'Entrevista',done:false,note:'Revisar o portfólio e separar perguntas para a equipe.'},
    {id:'evt-lume',title:'Entregar desafio de UX/UI',company:'Lume',jobId:'lume',date:localDate(1),time:'18:00',type:'Teste',done:false,note:'Revisar o protótipo antes de enviar.'},
    {id:'evt-verde',title:'Responder à proposta',company:'Verde',jobId:'verde',date:localDate(3),time:'10:00',type:'Lembrete',done:false,note:'Conferir benefícios e modelo de contratação.'},
    {id:'evt-nuvem',title:'Conferir retorno da candidatura',company:'Nuvem',jobId:'nuvem',date:localDate(6),time:'09:00',type:'Lembrete',done:false,note:'Verificar o e-mail e o site da empresa.'},
  ];
  return {jobs,events};
}
export const defaultProfile = {name:'Lucas Almeida',email:'lucas.almeida@email.com',focus:'Encontrar minha próxima oportunidade',reminders:true,reminderPeriod:'24',compact:false};
