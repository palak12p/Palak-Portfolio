type IconProps = { name?: 'arrow' | 'close' | 'menu' | 'search' | 'download' | 'check' | 'copy' | 'spark' | 'external'; className?: string };

export function Icon({ name = 'arrow', className = '' }: IconProps) {
  const paths = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
    external: <><path d="M6 18 18 6M6 6h12v12" /></>,
    close: <><path d="m6 6 12 12M6 18 18 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M15 8V3H3v13h5" /></>,
    spark: <><path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7z" /></>,
  };
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
