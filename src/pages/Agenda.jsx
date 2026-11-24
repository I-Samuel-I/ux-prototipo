import React, { useMemo, useState } from 'react';
import {CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Edit3, Plus} from '../components/icons';
import { useApp, Link } from '../context.jsx';
import { PageHeading, EmptyState, EventModal } from '../components/ui.jsx';
import './secondary.css';

const weekdays = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom'];
const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const readDate = (value) => new Date(`${value}T12:00:00`);
const prettyDate = (value, options) => readDate(value).toLocaleDateString('pt-BR', options);

export default function Agenda() {
  const { events, jobs, updateEvent, notify } = useApp();
  const today = dateKey(new Date());
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selected, setSelected] = useState(today);
  const [view, setView] = useState('upcoming');
  const [modal, setModal] = useState(null);
  const monthTitle = month.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const days = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const length = Math.ceil((offset + count) / 7) * 7;
    return Array.from({ length }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - offset + 1));
  }, [month]);
  const sorted = [...events].sort((a, b) => `${a.date} ${a.time || ''}`.localeCompare(`${b.date} ${b.time || ''}`));
  const visibleEvents = sorted.filter((event) => view === 'day' ? event.date === selected : !event.done || event.date >= today);
  const pending = events.filter((event) => !event.done);
  const todayEvents = events.filter((event) => event.date === today && !event.done);
  const changeMonth = (direction) => setMonth((value) => new Date(value.getFullYear(), value.getMonth() + direction, 1));
  const selectDay = (date) => {
    setSelected(dateKey(date));
    setView('day');
    if (date.getMonth() !== month.getMonth()) setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return (
    <div className="sx-page sx-agenda">
      <PageHeading eyebrow="AGENDA" title="Seu tempo, bem cuidado." description="Entrevistas, testes e pequenos próximos passos. Tudo no seu ritmo.">
        <button className="sx-button sx-button-primary" onClick={() => setModal({})}><Plus size={18} /> Novo compromisso</button>
      </PageHeading>

      <div className="sx-agenda-grid">
        <section className="sx-card sx-calendar" aria-label="Calendário mensal">
          <div className="sx-card-heading"><div><span className="sx-eyebrow">UM DIA DE CADA VEZ</span><h2 className="sx-month-title">{monthTitle}</h2></div><div className="sx-month-controls"><button className="sx-icon-button" aria-label="Mês anterior" onClick={() => changeMonth(-1)}><ChevronLeft size={20} /></button><button className="sx-icon-button" aria-label="Próximo mês" onClick={() => changeMonth(1)}><ChevronRight size={20} /></button></div></div>
          <div className="sx-calendar-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
          <div className="sx-calendar-days">
            {days.map((date) => {
              const key = dateKey(date);
              const dayEvents = events.filter((event) => event.date === key);
              const outside = date.getMonth() !== month.getMonth();
              return <button key={key} className={`sx-calendar-day${outside ? ' sx-day-outside' : ''}${key === today ? ' sx-day-today' : ''}${key === selected && view === 'day' ? ' sx-day-selected' : ''}`} aria-label={`${date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}${dayEvents.length ? `, ${dayEvents.length} compromisso${dayEvents.length > 1 ? 's' : ''}` : ''}`} aria-pressed={key === selected && view === 'day'} onClick={() => selectDay(date)}><span>{date.getDate()}</span>{dayEvents.length > 0 && <i className={dayEvents.every((event) => event.done) ? 'sx-dot-completed' : ''} aria-hidden="true" />}</button>;
            })}
          </div>
          <div className="sx-calendar-footer"><span><i /> Com compromisso</span><button className="sx-text-button" onClick={() => { setMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1)); setSelected(today); setView('day'); }}>Ir para hoje</button></div>
        </section>

        <aside className="sx-agenda-aside">
          <div className="sx-lime-card sx-day-summary"><div className="sx-card-heading"><span className="sx-eyebrow">ESPAÇO PARA O QUE IMPORTA</span><CalendarDays size={24} /></div><div className="sx-summary-number">{todayEvents.length.toString().padStart(2, '0')}<span>para hoje</span></div><p>{todayEvents.length ? 'Respire fundo. Seu próximo passo já tem um lugar na agenda.' : 'Um respiro na agenda. Que tal revisar suas candidaturas?'}</p><Link className="sx-quiet-link" to="/candidaturas">Ver minhas candidaturas</Link></div>
          <div className="sx-card sx-agenda-tip"><div><h3>Um lembrete amigo</h3><p>Reserve alguns minutos antes da entrevista para revisar a vaga e testar sua conexão.</p></div></div>
        </aside>

        <section className="sx-card sx-event-section">
          <div className="sx-event-header"><div><span className="sx-eyebrow">PRÓXIMOS PASSOS</span><h2>{view === 'day' ? prettyDate(selected, { day: 'numeric', month: 'long' }) : 'O que vem por aí'}</h2></div><div className="sx-segmented" aria-label="Exibição de compromissos"><button className={view === 'upcoming' ? 'is-active' : ''} aria-pressed={view === 'upcoming'} onClick={() => setView('upcoming')}>Próximos</button><button className={view === 'day' ? 'is-active' : ''} aria-pressed={view === 'day'} onClick={() => setView('day')}>Dia selecionado</button></div></div>
          {visibleEvents.length ? <div className="sx-event-list">{visibleEvents.map((event) => {
            const job = jobs.find((item) => item.id === event.jobId);
            return <article className={`sx-event-row${event.done ? ' sx-event-done' : ''}`} key={event.id}><div className="sx-event-date"><strong>{prettyDate(event.date, { day: '2-digit' })}</strong><span>{prettyDate(event.date, { month: 'short' }).replace('.', '')}</span></div><div className="sx-event-info"><div className="sx-event-labels"><span className={`sx-type sx-type-${event.type === 'Teste' ? 'test' : event.type === 'Entrevista' ? 'interview' : 'reminder'}`}>{event.type}</span>{event.done && <span className="sx-done-label"><Check size={13} /> Concluído</span>}</div><h3>{event.title}</h3><p>{event.company || job?.company || 'Compromisso pessoal'}{event.time && <><span aria-hidden="true"> · </span><Clock3 size={13} /> {event.time}</>}</p>{event.note && <p className="sx-event-note">{event.note}</p>}{job && <Link className="sx-event-job" to={`/candidaturas/${job.id}`}>Ver candidatura</Link>}</div><div className="sx-event-actions"><button className="sx-icon-button" aria-label={`Editar ${event.title}`} onClick={() => setModal({ event })}><Edit3 size={17} /></button><button className={`sx-complete-button${event.done ? ' is-complete' : ''}`} aria-label={event.done ? `Reabrir ${event.title}` : `Concluir ${event.title}`} title={event.done ? 'Reabrir compromisso' : 'Marcar como concluído'} onClick={() => { updateEvent(event.id, { done: !event.done }); notify(event.done ? 'Compromisso reaberto.' : 'Mais um passo concluído!'); }}><Check size={18} /></button></div></article>;
          })}</div> : <div className="sx-empty-wrap"><EmptyState title={view === 'day' ? 'Um dia com espaço livre.' : 'Sua agenda está tranquila.'} description={view === 'day' ? 'Nenhum compromisso registrado para essa data. Você pode adicionar um quando precisar.' : 'Registre entrevistas, testes e lembretes para cuidar dos próximos passos.'} action={<button className="sx-button sx-button-primary" onClick={() => setModal({})}><Plus size={17} /> Adicionar compromisso</button>} /></div>}
        </section>

        <div className="sx-planning-note"><span><strong>{pending.length} próximo{pending.length !== 1 ? 's' : ''} passo{pending.length !== 1 ? 's' : ''}, uma coisa de cada vez.</strong><p>Os compromissos são registrados por você. Mantenha as datas atualizadas quando receber novidades.</p></span></div>
      </div>
      {modal && <EventModal event={modal.event} initialDate={view === 'day' ? selected : undefined} onClose={() => setModal(null)} />}
    </div>
  );
}
