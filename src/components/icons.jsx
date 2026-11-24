import {createElement, forwardRef} from 'react';
import glyphs from '../assets/icons/samuel-icons.json';

// Original Stroke / Rounded SVGs from https://lib-icons-samuel.vercel.app/.
// Only the icons used in this prototype are included. No external requests at runtime.
function createIcon(slug) {
  const Icon = forwardRef(function SamuelIcon({size = 24, color = 'currentColor', strokeWidth = 1.5, className = '', title, children, ...props}, ref) {
    const accessibleLabel = props['aria-label'] || props['aria-labelledby'] || title;
    return createElement('svg', {
      xmlns: 'http://www.w3.org/2000/svg', width: size, height: size,
      viewBox: '0 0 24 24', fill: 'none', color, stroke: 'currentColor', strokeWidth,
      strokeLinecap: 'round', strokeLinejoin: 'round', focusable: false,
      'aria-hidden': accessibleLabel ? undefined : true,
      role: accessibleLabel ? 'img' : undefined,
      ...(title ? {'aria-label': title} : {}),
      ...props, ref,
      className: `samuel-icon samuel-icon-${slug} ${className}`.trim(),
      'data-icon': slug,
    }, title ? createElement('title', {key: 'title'}, title) : null,
      ...glyphs[slug].map(([tag, attributes], index) => createElement(tag, {
        ...attributes,
        ...(attributes.strokeWidth ? {strokeWidth} : {}),
        key: attributes.key ?? index,
      })), children);
  });
  Icon.displayName = `SamuelIcon(${slug})`;
  return Icon;
}

export const Archive = createIcon('archive');
export const Bell = createIcon('notification-0-1');
export const BookOpen = createIcon('book-open');
export const BriefcaseBusiness = createIcon('briefcase');
export const CalendarDays = createIcon('calendar-0-2');
export const Check = createIcon('tick');
export const CheckCheck = createIcon('tick-double-0-1');
export const ChevronDown = createIcon('arrow-down-0-1');
export const ChevronLeft = createIcon('arrow-left');
export const ChevronRight = createIcon('arrow-right');
export const Clock3 = createIcon('clock-0-1');
export const CloudRain = createIcon('cloud-rain');
export const Compass = createIcon('compass');
export const Database = createIcon('database');
export const Download = createIcon('download-0-1');
export const Edit3 = createIcon('pencil-edit-0-1');
export const ExternalLink = createIcon('link-square');
export const Eye = createIcon('eye');
export const EyeOff = createIcon('eye-off');
export const FileText = createIcon('file-0-1');
export const FlaskConical = createIcon('test-tube');
export const Headphones = createIcon('headphones');
export const Heart = createIcon('favourite');
export const Inbox = createIcon('inbox');
export const Info = createIcon('information-circle');
export const Layers3 = createIcon('layers-0-1');
export const LayoutDashboard = createIcon('dashboard-square-0-1');
export const LayoutGrid = createIcon('dashboard-square-0-1');
export const Link2 = createIcon('link-0-1');
export const List = createIcon('list-view');
export const LogIn = createIcon('login');
export const Mail = createIcon('mail-0-1');
export const MapPin = createIcon('location-0-1');
export const Menu = createIcon('menu-0-1');
export const MessageCircle = createIcon('bubble-chat');
export const MessageSquare = createIcon('bubble-chat');
export const MessagesSquare = createIcon('bubble-chat');
export const Mouse = createIcon('mouse');
export const Pencil = createIcon('pencil-edit-0-1');
export const Plus = createIcon('plus-sign');
export const RotateCcw = createIcon('refresh');
export const Save = createIcon('floppy-disk');
export const Search = createIcon('search');
export const Settings2 = createIcon('settings-0-1');
export const ShieldCheck = createIcon('security-check');
export const SlidersHorizontal = createIcon('filter-horizontal');
export const ThumbsUp = createIcon('thumbs-up');
export const UserRound = createIcon('user');
export const X = createIcon('cancel');
