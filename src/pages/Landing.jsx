import React, { useEffect, useRef, useState } from 'react';
import {CalendarDays, Check, CheckCheck, ChevronDown, Clock3, Layers3, Menu, Mouse, Plus, Search, X} from '../components/icons';
import { Link } from '../context.jsx';
import { Brand } from '../components/ui.jsx';
import './landing.css';

const story = [
  { eyebrow: 'GUARDE O QUE IMPORTA', title: <>Uma vaga nova.<br />Um lugar para <em>guardar.</em></>, text: 'Achou no LinkedIn, no site da empresa ou em uma conversa? Registre os detalhes essenciais e tenha tudo à mão, quando precisar.', tags: ['Empresa e cargo', 'Origem da vaga', 'Suas anotações'] },
  { eyebrow: 'ENXERGUE SEU CAMINHO', title: <>Menos “em que pé está?”.<br />Mais <em>clareza.</em></>, text: 'Cada processo tem seu próprio ritmo. Atualize as etapas e veja suas candidaturas em um quadro que acompanha o seu momento.', tags: ['Etapas visíveis', 'Histórico organizado', 'Atualização por você'] },
  { eyebrow: 'CHEGUE NO SEU TEMPO', title: <>O próximo passo<br />merece um <em>lembrete.</em></>, text: 'A entrevista de amanhã. O teste de sexta. Organize seus compromissos e deixe espaço na cabeça para se preparar.', tags: ['Agenda de entrevistas', 'Prazos de testes', 'Lembretes sob controle'] },
];


function HeroArt() {
  return <div className="lp-hero-art" aria-label="Prévia visual de candidaturas e compromissos organizados no elo">
    <div className="lp-art-label">SEU NOVO PONTO DE PARTIDA</div>
    <div className="lp-float-card lp-job-card">
      <div className="lp-card-top"><div className="lp-company-mark">ó</div><span className="lp-art-pill">Entrevista</span></div>
      <p className="lp-mini-label">ÓRBITA STUDIO</p><h3>Designer de produto</h3><span className="lp-card-sub">Remoto · Tempo integral</span>
      <div className="lp-job-progress"><span className="lp-complete"><Check size={12} /></span><i /><span className="lp-complete"><Check size={12} /></span><i /><span className="lp-current" /><i /><span /></div>
      <div className="lp-card-bottom"><span>Você está avançando.</span></div>
    </div>
    <div className="lp-float-card lp-calendar-card"><div className="lp-calendar-icon"><CalendarDays size={23} /></div><div><span>SEU PRÓXIMO PASSO</span><strong>Uma boa conversa.</strong><p>Entrevista com a Lume<br />Amanhã, às 14h</p></div><span className="lp-calendar-check"><Check size={14} /></span></div>
    <div className="lp-art-caption">Cada candidatura, uma possibilidade.</div>
  </div>;
}

function StoryVisual({ active }) {
  return <div className={`lp-story-canvas lp-story-canvas-${active}`}>
    <div className="lp-story-window" key={active}>
      <div className="lp-window-bar"><div><i /><i /><i /></div><span>seu espaço de possibilidades</span><Layers3 size={15} /></div>
      {active === 0 && <div className="lp-window-content"><div className="lp-preview-heading"><span className="lp-preview-icon"><Plus size={22} /></span><h4>Um novo começo.</h4><p>Vamos guardar essa oportunidade?</p></div><label>Empresa<div className="lp-fake-input">Órbita Studio</div></label><label>Cargo<div className="lp-fake-input">Designer de produto</div></label><div className="lp-fake-two"><label>Origem<div className="lp-fake-input">LinkedIn</div></label><label>Etapa<div className="lp-fake-input">Candidatura enviada</div></label></div><div className="lp-fake-submit"><Check size={16} /> Candidatura organizada</div></div>}
      {active === 1 && <div className="lp-window-content lp-preview-board"><div className="lp-preview-heading"><h4>Cada passo conta.</h4><p>Seu caminho fica mais fácil de enxergar.</p></div><div className="lp-mini-board"><div><span className="lp-board-title">Enviadas <b>2</b></span><div className="lp-mini-job"><span className="lp-mini-logo lp-mini-logo-lime">l.</span><strong>UX Designer</strong><small>Lume</small></div><div className="lp-mini-job"><span className="lp-mini-logo lp-mini-logo-peach">n</span><strong>Product Designer</strong><small>Nuvem</small></div></div><div><span className="lp-board-title">Entrevista <b>1</b></span><div className="lp-mini-job lp-mini-job-active"><span className="lp-mini-logo lp-mini-logo-purple">ó</span><strong>Designer de produto</strong><small>Órbita Studio</small><span className="lp-mini-job-note"><CalendarDays size={12} /> Amanhã, 14h</span></div></div></div><div className="lp-board-bottom"><CheckCheck size={16} /> Atualizado por você. No seu tempo.</div></div>}
      {active === 2 && <div className="lp-window-content"><div className="lp-preview-heading"><h4>Tem coisa boa vindo.</h4><p>Um espaço para os seus próximos passos.</p></div><div className="lp-mini-week">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((day, i) => <div className={i === 2 ? 'lp-day-selected' : ''} key={i}><span>{day}</span><strong>{23 + i}</strong></div>)}</div><div className="lp-mini-event"><span className="lp-event-time">14:00</span><div><span>ENTREVISTA</span><h5>Vamos conversar, Lucas?</h5><p>Órbita Studio · Google Meet</p></div></div><div className="lp-mini-reminder"><Clock3 size={17} /><div><strong>Um lembrete do que importa</strong><span>Confira seus compromissos na agenda.</span></div></div></div>}
    </div>
    <div className="lp-story-stage-indicator">{story.map((_, i) => <span className={i === active ? 'is-active' : ''} key={i} />)}</div>
  </div>;
}

export default function Landing() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const steps = useRef([]);
  const goTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setMenuOpen(false); };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.step)); });
    }, { rootMargin: '-15% 0px -15% 0px', threshold: 0.12 });
    steps.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div className="lp-page">
    <header className="lp-header"><div className="lp-header-inner"><Brand /><nav className={menuOpen ? 'lp-nav lp-nav-open' : 'lp-nav'} aria-label="Navegação principal"><button onClick={() => goTo('como-funciona')}>Como funciona</button><button onClick={() => goTo('feito-para-voce')}>Feito para você</button><button onClick={() => goTo('a-pesquisa')}>A pesquisa</button></nav><div className="lp-nav-actions"><Link to="/entrar" className="lp-login">Entrar</Link><Link to="/painel" className="lp-button lp-button-small">Experimentar o elo</Link></div><button className="lp-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <main>
      <section className="lp-hero lp-container"><div className="lp-hero-copy"><span className="lp-eyebrow">MENOS ABAS. MAIS POSSIBILIDADES.</span><h1>Seu próximo<br />passo, em<br />um só <em>lugar.</em></h1><p>Entre tantas candidaturas, encontre clareza.<br className="lp-desktop-br" /> Organize suas oportunidades e cuide<br className="lp-desktop-br" /> do que vem pela frente.</p><div className="lp-hero-actions"><Link to="/painel" className="lp-button">Organizar meu próximo passo</Link><span>Sem planilhas.<br />Sem complicação.</span></div><div className="lp-demo-note"><span>Pensado a partir de pessoas.<br /><strong>Feito para o seu momento.</strong></span></div></div><HeroArt /><div className="lp-hero-foot"><button onClick={() => goTo('como-funciona')}><Mouse size={17} /> Tem um caminho mais leve <ChevronDown size={15} /></button><span>UM ELO ENTRE VOCÊ E O QUE VEM DEPOIS.</span></div></section>

      <section className="lp-friction" aria-label="O problema que queremos resolver"><div className="lp-container lp-friction-inner"><p>LinkedIn. E-mail. WhatsApp. Caderno.<br /><strong>Sua busca já exige muito de você.</strong></p><p className="lp-friction-solution">Organizar tudo isso<br />pode ser <em>mais leve.</em></p></div></section>

      <section className="lp-story-section lp-container" id="como-funciona"><div className="lp-section-heading"><span className="lp-eyebrow">UM POUCO DE ORDEM. UM MUNDO DE POSSIBILIDADES.</span><h2>Do “me candidatei”<br />ao <em>“consegui”.</em></h2><p>Você não controla cada resposta.<br />Mas pode cuidar do seu caminho.</p></div><div className="lp-scrolly"><div className="lp-story-visual"><StoryVisual active={active} /></div><div className="lp-story-steps">{story.map((item, i) => <article className={`lp-story-step ${active === i ? 'lp-step-active' : ''}`} key={item.eyebrow} ref={el => steps.current[i] = el} data-step={i}><span className="lp-step-icon">{i === 0 ? <Plus size={24} /> : i === 1 ? <Layers3 size={24} /> : <CalendarDays size={24} />}</span><span className="lp-eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.text}</p><div className="lp-story-tags">{item.tags.map(tag => <span key={tag}><Check size={13} />{tag}</span>)}</div></article>)}</div></div></section>

      <section className="lp-for-you lp-container" id="feito-para-voce"><div className="lp-for-you-heading"><span className="lp-eyebrow">A BUSCA É SUA. O APOIO PODE SER NOSSO.</span><h2>Seu momento.<br /><em>Seu ritmo.</em></h2><p>Primeiro emprego, uma mudança de carreira ou um novo começo. Cabe no elo.</p></div><div className="lp-quote-card"><span className="lp-quote-mark">“</span><blockquote>Eu me candidato a várias vagas, mas depois fica difícil lembrar onde me candidatei e em que etapa está cada processo.</blockquote><div className="lp-quote-author"><span>LA</span><div><strong>Lucas Almeida</strong><p>Persona fictícia baseada na pesquisa</p></div></div></div><div className="lp-less-card"><div><span className="lp-eyebrow">PRA TIRAR UM PESO DA CABEÇA</span><h3>Menos “onde<br />foi mesmo?”.<br /><em>Mais “tá aqui”.</em></h3></div><div className="lp-search-illustration"><Search size={21} /><span>Uma vaga, uma data, um contato.</span><span className="lp-search-caret" /></div><p>Seus registros e anotações, juntos.<br />Para encontrar sem precisar recomeçar.</p></div></section>

      <section className="lp-research lp-container" id="a-pesquisa"><div className="lp-research-heading"><span className="lp-eyebrow">COMEÇAMOS ESCUTANDO</span><h2>Antes de uma interface,<br /><em>pessoas reais.</em></h2><p>O elo nasceu de uma pesquisa acadêmica sobre a experiência de quem procura emprego pela internet.</p><Link to="/sobre" className="lp-text-link">Conheça a pesquisa</Link></div><div className="lp-research-detail"><span className="lp-research-number">3<span>conversas.<br />Muitos pontos em comum.</span></span><div className="lp-research-findings"><p>Informações espalhadas entre plataformas.</p><p>Prazos e contatos difíceis de acompanhar.</p><p>Vontade de ter mais clareza na busca.</p></div><small>Pesquisa qualitativa com três participantes. Os achados orientam este protótipo e ainda precisam de validação com mais pessoas.</small></div></section>

      <section className="lp-final-cta"><div className="lp-container lp-final-inner"><span className="lp-eyebrow">NEM TODO PASSO PRECISA SER GRANDE.</span><h2>Que tal começar<br />pelo <em>próximo?</em></h2><p>Um lugar para organizar possibilidades.<br />E seguir com um pouco mais de leveza.</p><Link to="/painel" className="lp-button lp-button-lime">Conhecer meu espaço</Link><span className="lp-final-note">Protótipo interativo · Sem cadastro obrigatório</span></div></section>
    </main>
    <footer className="lp-footer lp-container"><div className="lp-footer-top"><div><Brand /><p>Entre você e o que vem depois.</p></div><div className="lp-footer-links"><Link to="/sobre">Sobre o projeto</Link><Link to="/painel">Explorar o protótipo</Link><Link to="/entrar">Entrar</Link></div></div><div className="lp-footer-bottom"><span>© {new Date().getFullYear()} elo · Um projeto da Equipe Fluxo Noturno.</span><span>Samuel Gomes Araújo · 4º Período B</span><span>Feito de escuta e possibilidades</span></div></footer>
  </div>;
}
