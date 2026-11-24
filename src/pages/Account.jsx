import React, { useEffect, useState } from 'react';
import {Check, CheckCheck, Eye, EyeOff, CalendarDays, BriefcaseBusiness, ShieldCheck, Compass} from '../components/icons';
import { Link, useApp } from '../context.jsx';
import { Brand } from '../components/ui.jsx';
import './account.css';

const goals = [
  { id: 'organizar', icon: BriefcaseBusiness, title: 'Organizar minhas candidaturas', text: 'Saber onde me candidatei e em qual etapa estou.' },
  { id: 'prazos', icon: CalendarDays, title: 'Ficar de olho nos prazos', text: 'Ter entrevistas, testes e próximos passos à vista.' },
  { id: 'clareza', icon: Compass, title: 'Ter mais clareza na minha busca', text: 'Encontrar meu histórico sem procurar em vários lugares.' },
];

const copy = {
  login: { kicker: 'QUE BOM TER VOCÊ AQUI', title: 'Vamos ao seu', italic: 'próximo passo?', description: 'Entre para explorar suas candidaturas e o que vem pela frente.' },
  register: { kicker: 'UM NOVO COMEÇO', title: 'Sua busca merece', italic: 'mais leveza.', description: 'Crie seu perfil de demonstração. É rápido e você já pode começar a organizar.' },
  forgot: { kicker: 'SEM COMPLICAÇÃO', title: 'Um passo para', italic: 'recomeçar.', description: 'Veja como seria a recuperação de acesso na experiência elo.' },
  onboarding: { kicker: 'DO SEU JEITO', title: 'O que você quer', italic: 'descomplicar?', description: 'Escolha o que faz sentido para o seu momento. Você pode marcar mais de uma opção.' },
};

export default function Account({ mode = 'login' }) {
  const { navigate, setProfile, notify } = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);
  const [selected, setSelected] = useState(['organizar']);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const content = copy[mode] || copy.login;

  useEffect(() => {
    setShowPassword(false);
    setRecoverySent(false);
    setEmail('');
    setName('');
  }, [mode]);

  function submit(event) {
    event.preventDefault();
    if (mode === 'forgot') {
      setRecoverySent(true);
      return;
    }
    setProfile((current) => ({ ...current, ...(name.trim() ? { name: name.trim() } : {}), email: email.trim() }));
    if (mode === 'register') {
      notify('Perfil demonstrativo criado. Vamos deixar o elo com a sua cara?');
      navigate('/primeiros-passos');
    } else {
      notify('Você entrou na demonstração do elo.');
      navigate('/painel');
    }
  }

  function finishOnboarding() {
    setProfile((current) => ({ ...current, focus: goals.filter(goal => selected.includes(goal.id)).map(goal => goal.title).join('; ') || 'Encontrar minha próxima oportunidade' }));
    notify('Tudo pronto para o seu próximo passo.');
    navigate('/painel');
  }

  return (
    <main className="ac-page">
      <aside className="ac-story" aria-label="Bem-vindo ao elo">
        <div className="ac-brand"><Brand light /></div>
        <div className="ac-story-copy">
          <span className="ac-overline">SUA CARREIRA EM MOVIMENTO</span>
          <h1>Entre uma <br />oportunidade<br />e outra, <em>elo.</em></h1>
          <p>Menos abas abertas.<br />Mais espaço para o que vem a seguir.</p>
        </div>
        <div className="ac-art" aria-hidden="true">
          <div className="ac-job-card">
            <div className="ac-job-logo">o.</div>
            <div><strong>Um novo começo</strong><span>Designer de Produto · Órbita</span></div>
            <span className="ac-job-check"><Check size={18} /></span>
            <div className="ac-job-track"><i /><i /><i /><i /></div>
            <div className="ac-job-foot"><span>Seu próximo passo</span><strong>Entrevista</strong></div>
          </div>
          <div className="ac-reminder-card"><CalendarDays size={22} /><div><strong>Você tem um encontro</strong><span>com o seu futuro.</span></div></div>
        </div>
        <div className="ac-story-bottom"><span>Um lugar para conectar seus próximos passos.</span><span className="ac-mini-mark">feito para você</span></div>
      </aside>

      <section className="ac-form-panel">
        <div className="ac-top-nav"><Link to="/">Conheça o elo</Link><span>PROTÓTIPO INTERATIVO</span></div>
        <div className={`ac-form-wrap ${mode === 'onboarding' ? 'ac-onboarding' : ''}`}>
          <span className="ac-kicker">{content.kicker}</span>
          <h2>{content.title}<br /><em>{content.italic}</em></h2>
          <p className="ac-description">{content.description}</p>

          {mode === 'onboarding' ? (
            <>
              <div className="ac-goal-list" aria-label="Seus objetivos">
                {goals.map(({ id, icon: Icon, title, text }) => (
                  <button type="button" key={id} className={`ac-goal ${selected.includes(id) ? 'is-selected' : ''}`} aria-pressed={selected.includes(id)} onClick={() => setSelected((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])}>
                    <span className="ac-goal-icon"><Icon size={23} /></span><span className="ac-goal-content"><strong>{title}</strong><span>{text}</span></span><span className="ac-goal-tick">{selected.includes(id) && <Check size={15} />}</span>
                  </button>
                ))}
              </div>
              <button className="ac-primary" type="button" onClick={finishOnboarding}>Ir para meu painel</button>
              <button className="ac-skip" type="button" onClick={() => navigate('/painel')}>Escolher depois</button>
            </>
          ) : recoverySent ? (
            <div className="ac-recovery" role="status">
              <span className="ac-recovery-icon"><CheckCheck size={28} /></span>
              <h3>É assim que funciona.</h3>
              <p>Em uma conta real, você receberia um link de recuperação em <strong>{email}</strong>.</p>
              <p>Este é um protótipo: nenhum e-mail foi enviado e nenhuma senha foi alterada.</p>
              <Link className="ac-primary" to="/entrar">Voltar para entrar</Link>
              <Link className="ac-secondary" to="/painel">Explorar demonstração</Link>
            </div>
          ) : (
            <form className="ac-form" onSubmit={submit}>
              {mode === 'register' && <label className="ac-label" htmlFor="account-name">Como podemos chamar você?<input id="account-name" name="name" placeholder="Seu nome" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} maxLength={80} /></label>}
              <label className="ac-label" htmlFor="account-email">Seu e-mail<input id="account-email" name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" required value={email} onChange={(event) => setEmail(event.target.value)} maxLength={150} /></label>
              {mode !== 'forgot' && (
                <div>
                  <div className="ac-password-heading"><label htmlFor="account-password">Sua senha</label>{mode === 'login' && <Link to="/recuperar-senha">Esqueci minha senha</Link>}</div>
                  <div className="ac-password-input"><input id="account-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder={mode === 'register' ? 'Crie uma senha com pelo menos 6 caracteres' : 'Digite sua senha demonstrativa'} required minLength={mode === 'register' ? 6 : 1} maxLength={100} /><button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={showPassword} onClick={() => setShowPassword((shown) => !shown)}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
                </div>
              )}
              {mode === 'register' && <label className="ac-consent"><input type="checkbox" required /><span>Entendi que este é um protótipo e que meus dados ficam somente neste navegador.</span></label>}
              <button className="ac-primary" type="submit">{mode === 'register' ? 'Criar meu perfil' : mode === 'forgot' ? 'Simular recuperação' : 'Entrar no elo'}</button>
              {mode !== 'forgot' && <><div className="ac-divider"><span />ou comece por aqui<span /></div><Link to="/painel" className="ac-secondary"><Compass size={18} /> Explorar demonstração</Link></>}
              <p className="ac-switch">{mode === 'register' ? <>Já tem um perfil? <Link to="/entrar">Entre aqui</Link></> : mode === 'forgot' ? <Link to="/entrar">Voltar para entrar</Link> : <>Primeira vez por aqui? <Link to="/cadastro">Crie seu perfil</Link></>}</p>
            </form>
          )}
          <div className="ac-privacy"><ShieldCheck size={17} /><p>Experiência demonstrativa. Não use sua senha real. Nenhuma autenticação ou envio de e-mail é realizado.</p></div>
        </div>
        <footer className="ac-form-footer"><span>elo © 2026</span><Link to="/sobre">Sobre o projeto</Link></footer>
      </section>
    </main>
  );
}
