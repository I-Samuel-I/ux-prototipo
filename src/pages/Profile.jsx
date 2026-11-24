import React, { useEffect, useRef, useState } from 'react';
import {Bell, Check, ChevronDown, Database, RotateCcw, Save, ShieldCheck, SlidersHorizontal, UserRound, X} from '../components/icons';
import { useApp, Link } from '../context.jsx';
import { PageHeading } from '../components/ui.jsx';
import './secondary.css';

function PreferenceSwitch({ checked, onChange, label }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`sx-switch${checked ? ' is-checked' : ''}`} onClick={() => onChange(!checked)}><span>{checked && <Check size={11} />}</span></button>;
}

export default function Profile() {
  const { profile, setProfile, jobs, events, resetDemo, notify } = useApp();
  const [form, setForm] = useState({ name: profile.name, email: profile.email, focus: profile.focus });
  const [showReset, setShowReset] = useState(false);
  const resetDialog = useRef(null);
  useEffect(() => { setForm({ name: profile.name, email: profile.email, focus: profile.focus }); }, [profile.name, profile.email, profile.focus]);
  useEffect(() => {
    const dialog = resetDialog.current;
    if (showReset && dialog && !dialog.open) dialog.showModal();
    else if (!showReset && dialog?.open) dialog.close();
  }, [showReset]);
  const setPreference = (field, value) => { setProfile((current) => ({ ...current, [field]: value })); notify('Preferência salva neste navegador.'); };
  const saveProfile = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    setProfile((current) => ({ ...current, name: form.name.trim(), email: form.email.trim(), focus: form.focus.trim() }));
    notify('Seu perfil foi atualizado.');
  };
  const initials = form.name.split(' ').filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase() || 'LA';

  return (
    <div className="sx-page sx-profile">
      <PageHeading eyebrow="PERFIL E PREFERÊNCIAS" title="Um espaço com a sua cara." description="Ajuste os detalhes para organizar sua jornada do seu jeito." />
      <div className="sx-profile-grid">
        <section className="sx-card sx-profile-form-card">
          <div className="sx-profile-intro"><div className="sx-avatar">{initials}<span><UserRound size={14} /></span></div><div><span className="sx-eyebrow">PRAZER, VOCÊ</span><h2>Seu perfil</h2><p>Seu próximo capítulo começa por aqui.</p></div></div>
          <form onSubmit={saveProfile} className="sx-form">
            <label className="sx-field"><span>Como podemos te chamar?</span><input name="name" autoComplete="name" required maxLength={80} value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Seu nome" /></label>
            <label className="sx-field"><span>E-mail</span><input name="email" autoComplete="email" required type="email" maxLength={150} value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="voce@email.com" /><small>Informação do perfil demonstrativo. Nenhum e-mail será enviado.</small></label>
            <label className="sx-field"><span>O que você procura agora?</span><textarea name="focus" rows={3} maxLength={240} value={form.focus} onChange={(event) => setForm((current) => ({ ...current, focus: event.target.value }))} placeholder="Ex.: minha primeira oportunidade em design de produto" /><small>Um pequeno lembrete do que move sua busca.</small></label>
            <div className="sx-form-footer"><span><ShieldCheck size={15} /> Salvo no seu navegador</span><button type="submit" className="sx-button sx-button-primary"><Save size={17} /> Salvar perfil</button></div>
          </form>
        </section>

        <aside className="sx-profile-aside">
          <section className="sx-card sx-preferences"><div className="sx-section-icon"><SlidersHorizontal size={21} /></div><h2>Seu ritmo, suas escolhas.</h2><p>Pequenos ajustes para uma jornada mais leve.</p><div className="sx-preference-row"><div><strong>Lembretes em destaque</strong><span>Exibir avisos de compromissos no painel.</span></div><PreferenceSwitch checked={profile.reminders} onChange={(value) => setPreference('reminders', value)} label="Exibir lembretes em destaque" /></div><label className="sx-field sx-reminder-period"><span>Antecedência preferida</span><div className="sx-select-wrap"><select value={profile.reminderPeriod || '24'} disabled={!profile.reminders} onChange={(event) => setPreference('reminderPeriod', event.target.value)}><option value="1">1 hora antes</option><option value="12">12 horas antes</option><option value="24">24 horas antes</option><option value="48">48 horas antes</option></select><ChevronDown size={17} aria-hidden="true" /></div></label><div className="sx-preference-row sx-preference-last"><div><strong>Visualização compacta</strong><span>Reduzir os espaços na lista de candidaturas.</span></div><PreferenceSwitch checked={profile.compact} onChange={(value) => setPreference('compact', value)} label="Usar visualização compacta" /></div><div className="sx-preference-note"><Bell size={16} /><p>Preferências locais do protótipo. Os avisos aparecem dentro do app; não há envio de notificações.</p></div></section>
          <section className="sx-lime-card sx-profile-quote"><p>Encontrar seu lugar também é sobre <em>respeitar seu tempo.</em></p><span>A ELO CAMINHA COM VOCÊ</span></section>
        </aside>

        <section className="sx-card sx-storage-card"><div className="sx-storage-copy"><div className="sx-section-icon"><Database size={22} /></div><div><h2>Seus dados ficam por aqui.</h2><p>Este é um protótipo de interface. Candidaturas, agenda e preferências ficam apenas neste navegador, sem conta real ou conexão com plataformas de emprego.</p><div className="sx-storage-counts"><span><strong>{jobs.length}</strong> candidaturas</span><span><strong>{events.length}</strong> compromissos</span></div></div></div><div className="sx-storage-reset"><p>Quer explorar tudo desde o começo?</p><button className="sx-button sx-button-outline" onClick={() => setShowReset(true)}><RotateCcw size={16} /> Restaurar demonstração</button><small>Substitui seus registros pelos exemplos iniciais.</small></div></section>

        <section className="sx-team-card"><div><span className="sx-eyebrow">DESIGN COM PROPÓSITO</span><h3>De pessoas, para pessoas.</h3><p>Um projeto de experiência do usuário da Equipe Fluxo Noturno.</p></div><Link className="sx-button sx-button-outline" to="/sobre">Conheça o projeto</Link><div className="sx-team-credits"><span>Samuel Gomes Araújo</span><span>4º Período B · Professor José Neto</span></div></section>
      </div>

      <dialog className="sx-reset-dialog" ref={resetDialog} onCancel={() => setShowReset(false)} onClick={(event) => { if (event.target === resetDialog.current) setShowReset(false); }} aria-labelledby="sx-reset-title" aria-describedby="sx-reset-description"><div className="sx-dialog-content"><button className="sx-icon-button sx-dialog-close" aria-label="Fechar confirmação" onClick={() => setShowReset(false)}><X size={21} /></button><div className="sx-reset-symbol"><RotateCcw size={25} /></div><h2 id="sx-reset-title">Um novo começo?</h2><p id="sx-reset-description">Suas candidaturas, compromissos e preferências deste navegador serão substituídos pelos dados de exemplo da demonstração.</p><p className="sx-reset-warning">Os registros que você adicionou serão removidos.</p><div className="sx-dialog-actions"><button className="sx-button sx-button-outline" onClick={() => setShowReset(false)}>Manter meus dados</button><button className="sx-button sx-button-primary" onClick={() => { resetDemo(); setShowReset(false); }}>Restaurar exemplos</button></div></div></dialog>
    </div>
  );
}
