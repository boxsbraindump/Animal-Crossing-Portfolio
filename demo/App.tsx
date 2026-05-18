import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { Cursor } from '../src/components/Cursor';
import { Icon } from '../src/components/Icon';
import '../src/styles/index.less';
import '@fontsource/nunito/latin-500.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-900.css';
import '@fontsource/noto-sans-sc/latin-400.css';
import '@fontsource/noto-sans-sc/latin-500.css';
import '@fontsource/noto-sans-sc/latin-700.css';
import '@fontsource/zen-maru-gothic/latin-500.css';
import '@fontsource/zen-maru-gothic/latin-700.css';
import '@fontsource/zen-maru-gothic/latin-900.css';
import HomePage from './HomePage';
import { useIsMobile } from './useIsMobile';
import { AudioPlayer } from './AudioPlayer';

const ComponentPage = lazy(() => import('./ComponentPage'));

const useHash = () => {
    const [hash, setHash] = useState(() => window.location.hash.slice(1) || '/');

    useEffect(() => {
        const onHashChange = () => setHash(window.location.hash.slice(1) || '/');
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const navigate = useCallback((path: string) => {
        window.location.hash = path;
    }, []);

    return { hash, navigate };
};

interface MenuItem {
    key: string;
    label: string;
    icon: React.ComponentProps<typeof Icon>['name'];
}

const MENU_ITEMS: MenuItem[] = [
    { key: 'home', label: 'Home', icon: 'icon-helicopter' },
    { key: 'work', label: 'Work', icon: 'icon-map' },
    { key: 'vibe-coding', label: 'Vibe Coding', icon: 'icon-diy' },
    { key: 'about', label: 'About', icon: 'icon-variant' },
    { key: 'contact', label: 'Contact', icon: 'icon-shopping' },
];

const WORK_SUBMENU_ITEMS: MenuItem[] = [
    { key: 'nekopaw', label: 'NekoPaw', icon: 'icon-chat' },
    { key: 'lake-hills', label: 'Lake Hills', icon: 'icon-design' },
    { key: 'watc-camp', label: 'WATC Camp', icon: 'icon-camera' },
];

const WORK_KEYS = new Set(['work', ...WORK_SUBMENU_ITEMS.map((item) => item.key)]);

const fontFamily =
    "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

const S = {
    layout: {
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100dvh',
        overflow: 'hidden',
        fontFamily,
        background: `url(${new URL('./img/content_bg_pc.jpg', import.meta.url).href}) center / auto repeat`,
    } as React.CSSProperties,
    homeLayout: {
        display: 'flex',
        height: '100dvh',
        overflow: 'auto',
        fontFamily,
        background: `url(${new URL('./img/home_bg.webp', import.meta.url).href}) 0 0 / auto repeat, #7DC395`,
        animation: 'bgScroll 80s linear infinite',
    } as React.CSSProperties,
    topBar: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        width: '100%',
        minHeight: 74,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 34px',
        background: 'rgba(255, 252, 244, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid rgba(196, 184, 158, 0.55)',
        boxShadow: '0 5px 0 rgba(189, 174, 160, 0.32)',
        transition: 'transform 0.28s ease',
    } as React.CSSProperties,
    topBarInner: {
        width: 'min(1280px, 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
    } as React.CSSProperties,
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        fontWeight: 900,
        fontSize: 17,
        color: '#725d42',
        lineHeight: 1.1,
        cursor: 'pointer',
        whiteSpace: 'nowrap' as const,
    } as React.CSSProperties,
    topNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 6,
        flexWrap: 'nowrap' as const,
    } as React.CSSProperties,
    navItem: (active: boolean) =>
        ({
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            minHeight: 38,
            padding: '0 12px',
            fontFamily,
            fontWeight: 800,
            fontSize: 13,
            color: active ? '#ffffff' : '#725d42',
            background: active ? '#82d5bb' : 'rgba(248, 248, 240, 0.58)',
            border: active ? '2px solid #6fba2c' : '2px solid rgba(196, 184, 158, 0.6)',
            borderRadius: 999,
            boxShadow: active ? '0 4px 0 #5a9e1e' : '0 3px 0 rgba(189, 174, 160, 0.75)',
            transition: 'all 0.15s',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
        }) as React.CSSProperties,
    navGroup: {
        position: 'relative' as const,
        display: 'inline-flex',
    } as React.CSSProperties,
    dropdown: {
        position: 'absolute' as const,
        top: '100%',
        left: 0,
        zIndex: 80,
        minWidth: 190,
        padding: '18px 8px 8px',
        borderRadius: 20,
        background: 'rgba(255, 252, 244, 0.97)',
        border: '2px solid rgba(196, 184, 158, 0.72)',
        boxShadow: '0 8px 0 rgba(189, 174, 160, 0.55), 0 14px 28px rgba(93, 74, 49, 0.16)',
        backdropFilter: 'blur(10px)',
    } as React.CSSProperties,
    dropdownItem: (active: boolean) =>
        ({
            width: '100%',
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            border: 'none',
            borderRadius: 14,
            padding: '0 12px',
            background: active ? '#82d5bb' : 'transparent',
            color: active ? '#fff' : '#725d42',
            fontFamily,
            fontSize: 13,
            fontWeight: 900,
            textAlign: 'left' as const,
            cursor: 'pointer',
            whiteSpace: 'nowrap' as const,
        }) as React.CSSProperties,
    drawer: {
        width: 250,
        background: `url(${new URL('./img/menu_bg.svg', import.meta.url).href}) center/cover no-repeat`,
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
    } as React.CSSProperties,
    drawerHeader: {
        padding: '22px 16px 14px',
        borderBottom: '1px solid #e8e2d6',
        fontWeight: 900,
        fontSize: 17,
        color: '#725d42',
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        lineHeight: 1.1,
        cursor: 'pointer',
    } as React.CSSProperties,
    drawerList: {
        flex: 1,
        overflow: 'auto',
        padding: '10px 0',
    } as React.CSSProperties,
    drawerCategory: {
        padding: '12px 18px 5px',
        fontSize: 11,
        color: '#a0936e',
        fontWeight: 900,
        letterSpacing: 0.8,
        textTransform: 'uppercase' as const,
    } as React.CSSProperties,
    drawerItem: (active: boolean) =>
        ({
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            margin: '2px 7px',
            minHeight: 42,
            padding: '0 14px',
            fontFamily,
            fontWeight: 800,
            fontSize: 14,
            color: active ? '#fff' : '#725d42',
            background: active ? '#B7C6E5' : 'transparent',
            borderRadius: 12,
            transition: 'all 0.15s',
            cursor: 'pointer',
        }) as React.CSSProperties,
    drawerSubItem: (active: boolean) =>
        ({
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            margin: '2px 12px 2px 34px',
            minHeight: 36,
            padding: '0 12px',
            fontFamily,
            fontWeight: 800,
            fontSize: 13,
            color: active ? '#fff' : '#725d42',
            background: active ? '#82d5bb' : 'rgba(255, 252, 244, 0.46)',
            borderRadius: 12,
            transition: 'all 0.15s',
            cursor: 'pointer',
        }) as React.CSSProperties,
    main: {
        flex: 1,
        overflow: 'auto',
        padding: '110px 42px 54px',
        position: 'relative' as const,
        zIndex: 1,
    } as React.CSSProperties,
};

const routeFor = (key: string) => (key === 'home' ? '/' : `/${key}`);

const TopNav: React.FC<{
    activeKey: string;
    onNavigate: (path: string) => void;
    hidden: boolean;
}> = ({ activeKey, onNavigate, hidden }) => {
    const [workOpen, setWorkOpen] = useState(false);
    const isWorkActive = WORK_KEYS.has(activeKey);

    return (
        <header
            style={{
                ...S.topBar,
                transform: hidden ? 'translateY(-140%)' : 'translateY(0)',
                pointerEvents: hidden ? 'none' : 'auto',
            }}
        >
            <div style={S.topBarInner}>
                <div style={S.brand} onClick={() => onNavigate('/')}>
                    <img
                        src={new URL('./img/nook-phone/nook1.svg', import.meta.url).href}
                        style={{ width: 28, height: 28 }}
                        alt=""
                    />
                    <span>Ziyu He</span>
                </div>
                <nav style={S.topNav}>
                    {MENU_ITEMS.map((item) => {
                        const active = item.key === 'work' ? isWorkActive : activeKey === item.key;

                        if (item.key === 'work') {
                            return (
                                <div
                                    key={item.key}
                                    style={S.navGroup}
                                    onMouseEnter={() => setWorkOpen(true)}
                                    onMouseLeave={() => setWorkOpen(false)}
                                >
                                    <button
                                        style={S.navItem(active)}
                                        onClick={() => onNavigate('/work')}
                                    >
                                        <Icon name={item.icon} size={18} bounce={active} />
                                        <span>{item.label}</span>
                                    </button>
                                    {workOpen && (
                                        <div style={S.dropdown}>
                                            {WORK_SUBMENU_ITEMS.map((subItem) => (
                                                <button
                                                    key={subItem.key}
                                                    style={S.dropdownItem(activeKey === subItem.key)}
                                                    onClick={() => {
                                                        setWorkOpen(false);
                                                        onNavigate(routeFor(subItem.key));
                                                    }}
                                                    onMouseEnter={(event) => {
                                                        if (activeKey !== subItem.key) {
                                                            event.currentTarget.style.background = '#e6f9f6';
                                                        }
                                                    }}
                                                    onMouseLeave={(event) => {
                                                        if (activeKey !== subItem.key) {
                                                            event.currentTarget.style.background = 'transparent';
                                                        }
                                                    }}
                                                >
                                                    <Icon name={subItem.icon} size={18} bounce={activeKey === subItem.key} />
                                                    <span>{subItem.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <button
                                key={item.key}
                                style={S.navItem(active)}
                                onClick={() => onNavigate(routeFor(item.key))}
                                onMouseEnter={(event) => {
                                    if (!active) {
                                        event.currentTarget.style.transform = 'translateY(-1px)';
                                    }
                                }}
                                onMouseLeave={(event) => {
                                    if (!active) {
                                        event.currentTarget.style.transform = 'none';
                                    }
                                }}
                            >
                                <Icon name={item.icon} size={18} bounce={active} />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
                <AudioPlayer compact />
            </div>
        </header>
    );
};

const DrawerContent: React.FC<{
    activeKey: string;
    onNavigate: (path: string) => void;
}> = ({ activeKey, onNavigate }) => (
    <>
        <div style={S.drawerHeader} onClick={() => onNavigate('/')}>
            <img
                src={new URL('./img/nook-phone/nook1.svg', import.meta.url).href}
                style={{ width: 28, height: 28 }}
                alt=""
            />
            <span>Ziyu He</span>
        </div>
        <nav style={S.drawerList}>
            <div style={S.drawerCategory}>Portfolio</div>
            {MENU_ITEMS.map((item) => {
                const active = item.key === 'work' ? WORK_KEYS.has(activeKey) : activeKey === item.key;

                return (
                    <React.Fragment key={item.key}>
                        <div
                            style={S.drawerItem(active)}
                            onClick={() => onNavigate(routeFor(item.key))}
                            onMouseEnter={(event) => {
                                if (!active) event.currentTarget.style.background = '#d6dff0';
                            }}
                            onMouseLeave={(event) => {
                                if (!active) event.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <Icon name={item.icon} size={22} bounce={active} />
                            <span>{item.label}</span>
                        </div>
                        {item.key === 'work' &&
                            WORK_SUBMENU_ITEMS.map((subItem) => (
                                <div
                                    key={subItem.key}
                                    style={S.drawerSubItem(activeKey === subItem.key)}
                                    onClick={() => onNavigate(routeFor(subItem.key))}
                                >
                                    <Icon name={subItem.icon} size={18} bounce={activeKey === subItem.key} />
                                    <span>{subItem.label}</span>
                                </div>
                            ))}
                    </React.Fragment>
                );
            })}
        </nav>
    </>
);

const App: React.FC = () => {
    const { hash, navigate } = useHash();
    const isMobile = useIsMobile();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navVisible, setNavVisible] = useState(true);
    const homeScrollRef = React.useRef<HTMLDivElement>(null);
    const mainRef = React.useRef<HTMLElement>(null);
    const lastScrollTopRef = React.useRef(0);
    const activeKey = hash.startsWith('/') && hash.length > 1 ? hash.slice(1) : 'home';
    const isHomePage = activeKey === 'home';

    useEffect(() => {
        if (!isMobile) setDrawerOpen(false);
    }, [isMobile]);

    useEffect(() => {
        setDrawerOpen(false);
        setNavVisible(true);
        lastScrollTopRef.current = 0;
        mainRef.current?.scrollTo({ top: 0 });
    }, [activeKey]);

    useEffect(() => {
        const scrollElement = isHomePage ? homeScrollRef.current : mainRef.current;
        if (!scrollElement) return;

        const onScroll = () => {
            const currentTop = scrollElement.scrollTop;
            const previousTop = lastScrollTopRef.current;
            const delta = currentTop - previousTop;

            if (currentTop < 24) {
                setNavVisible(true);
            } else if (delta > 8 && currentTop > 82) {
                setNavVisible(false);
                setDrawerOpen(false);
            } else if (delta < -8) {
                setNavVisible(true);
            }

            lastScrollTopRef.current = currentTop;
        };

        scrollElement.addEventListener('scroll', onScroll, { passive: true });
        return () => scrollElement.removeEventListener('scroll', onScroll);
    }, [isHomePage, activeKey]);

    const handleNavigate = useCallback(
        (path: string) => {
            navigate(path);
            setDrawerOpen(false);
        },
        [navigate],
    );

    return (
        <Cursor>
            <style>{`
                @keyframes bgScroll {
                    0% { background-position: 100% 0%; }
                    100% { background-position: 0% 100%; }
                }
                *::-webkit-scrollbar { display: none; }
            `}</style>
            {isHomePage ? (
                <div ref={homeScrollRef} style={{ ...S.homeLayout, flexDirection: 'column' }}>
                    {!isMobile && <TopNav activeKey={activeKey} onNavigate={handleNavigate} hidden={!navVisible} />}
                    {isMobile && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 56,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 13px',
                                background: 'rgba(255,252,244,0.93)',
                                backdropFilter: 'blur(8px)',
                                borderBottom: '1px solid #e8e2d6',
                                zIndex: 50,
                                fontFamily,
                                transform: navVisible ? 'translateY(0)' : 'translateY(-140%)',
                                transition: 'transform 0.28s ease',
                                pointerEvents: navVisible ? 'auto' : 'none',
                            }}
                        >
                            <button onClick={() => navigate('/')} style={mobileBarButtonStyle}>
                                Ziyu
                            </button>
                            <AudioPlayer compact />
                            <button onClick={() => setDrawerOpen(true)} style={mobileBarButtonStyle}>
                                Menu
                            </button>
                        </div>
                    )}
                    {isMobile && drawerOpen && (
                        <>
                            <div
                                style={{
                                    position: 'fixed',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.35)',
                                    zIndex: 98,
                                }}
                                onClick={() => setDrawerOpen(false)}
                            />
                            <aside
                                style={{
                                    ...S.drawer,
                                    position: 'fixed',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    zIndex: 99,
                                    boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
                                }}
                            >
                                <DrawerContent activeKey={activeKey} onNavigate={handleNavigate} />
                            </aside>
                        </>
                    )}
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <HomePage onNavigate={navigate} />
                    </div>
                </div>
            ) : (
                <div style={S.layout}>
                    {!isMobile && (
                        <TopNav activeKey={activeKey} onNavigate={handleNavigate} hidden={!navVisible} />
                    )}

                    {isMobile && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 56,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 13px',
                                background: 'rgba(255,252,244,0.93)',
                                backdropFilter: 'blur(8px)',
                                borderBottom: '1px solid #e8e2d6',
                                zIndex: 50,
                                fontFamily,
                                transform: navVisible ? 'translateY(0)' : 'translateY(-140%)',
                                transition: 'transform 0.28s ease',
                                pointerEvents: navVisible ? 'auto' : 'none',
                            }}
                        >
                            <button onClick={() => navigate('/')} style={mobileBarButtonStyle}>
                                Home
                            </button>
                            <AudioPlayer compact />
                            <button onClick={() => setDrawerOpen(true)} style={mobileBarButtonStyle}>
                                Menu
                            </button>
                        </div>
                    )}

                    {isMobile && drawerOpen && (
                        <>
                            <div
                                style={{
                                    position: 'fixed',
                                    inset: 0,
                                    background: 'rgba(0,0,0,0.35)',
                                    zIndex: 98,
                                }}
                                onClick={() => setDrawerOpen(false)}
                            />
                            <aside
                                style={{
                                    ...S.drawer,
                                    position: 'fixed',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    zIndex: 99,
                                    boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
                                }}
                            >
                                <DrawerContent activeKey={activeKey} onNavigate={handleNavigate} />
                            </aside>
                        </>
                    )}

                    <main
                        ref={mainRef}
                        style={{
                            ...S.main,
                            padding: isMobile ? '76px 18px 28px' : S.main.padding,
                        }}
                    >
                        <Suspense fallback={null}>
                            <ComponentPage activeKey={activeKey} />
                        </Suspense>
                    </main>

                    {!isMobile && (
                        <img
                            src={new URL('./img/guide-bg-line.webp', import.meta.url).href}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            style={{
                                position: 'fixed',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                width: '100%',
                                pointerEvents: 'none',
                                zIndex: 0,
                            }}
                        />
                    )}
                </div>
            )}
        </Cursor>
    );
};

const mobileBarButtonStyle: React.CSSProperties = {
    border: 'none',
    background: '#f8f8f0',
    color: '#725d42',
    borderRadius: 999,
    padding: '7px 12px',
    fontWeight: 900,
    boxShadow: '0 3px 0 #bdaea0',
};

export default App;
