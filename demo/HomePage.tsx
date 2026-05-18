import React, { useState } from 'react';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { Divider } from '../src/components/Divider';
import { Icon } from '../src/components/Icon';
import { Typewriter } from '../src/components/Typewriter';
import { methodCards, profile, projects, studioStats } from './portfolioData';
import { useIsMobile } from './useIsMobile';

interface HomePageProps {
    onNavigate?: (path: string) => void;
}

const S = {
    page: {
        width: '100%',
        minHeight: '100vh',
        overflowY: 'auto' as const,
        color: '#5f4a32',
    } as React.CSSProperties,
    hero: {
        minHeight: 'calc(100vh - 74px)',
        display: 'flex',
        alignItems: 'center',
        padding: '38px 36px 28px',
        position: 'relative' as const,
    } as React.CSSProperties,
    heroInner: {
        width: 'min(1180px, 100%)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.88fr) minmax(380px, 0.82fr)',
        gap: 36,
        alignItems: 'center',
    } as React.CSSProperties,
    passport: {
        position: 'relative' as const,
        padding: 30,
        borderRadius: '30px 26px 34px 24px / 28px 34px 24px 30px',
        background: 'rgba(255, 252, 244, 0.9)',
        border: '3px solid rgba(121, 79, 39, 0.18)',
        boxShadow: '0 9px 0 rgba(115, 94, 63, 0.25), inset 0 0 0 8px rgba(255,255,255,0.35)',
        overflow: 'hidden',
    } as React.CSSProperties,
    smallLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 13px',
        borderRadius: 999,
        background: '#e6f9f6',
        color: '#247c73',
        fontSize: 12,
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.8,
        boxShadow: '0 4px 0 rgba(105, 155, 145, 0.22)',
    } as React.CSSProperties,
    title: {
        margin: '20px 0 14px',
        maxWidth: 760,
        fontSize: 72,
        lineHeight: 0.96,
        color: '#794f27',
        fontWeight: 900,
    } as React.CSSProperties,
    subtitle: {
        maxWidth: 690,
        fontSize: 18,
        lineHeight: 1.72,
        margin: '0 0 26px',
        color: '#5f4a32',
        fontWeight: 650,
    } as React.CSSProperties,
    actions: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: 12,
        alignItems: 'center',
    } as React.CSSProperties,
    stampRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 12,
        marginTop: 28,
    } as React.CSSProperties,
    stamp: {
        minHeight: 110,
        padding: 14,
        borderRadius: 20,
        background: 'rgba(248, 248, 240, 0.78)',
        border: '2px dashed rgba(121, 79, 39, 0.2)',
    } as React.CSSProperties,
    statValue: {
        display: 'block',
        fontSize: 27,
        lineHeight: 1,
        fontWeight: 900,
        color: '#19c8b9',
    } as React.CSSProperties,
    statLabel: {
        display: 'block',
        marginTop: 7,
        fontSize: 12,
        lineHeight: 1.2,
        fontWeight: 900,
        color: '#794f27',
    } as React.CSSProperties,
    statDetail: {
        display: 'block',
        marginTop: 8,
        fontSize: 11,
        lineHeight: 1.35,
        fontWeight: 700,
        color: '#7f725d',
    } as React.CSSProperties,
    map: {
        position: 'relative' as const,
        minHeight: 640,
        borderRadius: '42px 34px 46px 36px / 36px 48px 32px 44px',
        background:
            'radial-gradient(circle at 22% 22%, #f7cd67 0 12%, transparent 13%), radial-gradient(circle at 77% 30%, #82d5bb 0 15%, transparent 16%), radial-gradient(circle at 43% 76%, #f8a6b2 0 18%, transparent 19%), linear-gradient(145deg, rgba(230,249,246,0.92), rgba(255,252,244,0.9) 56%, rgba(214,229,240,0.82))',
        border: '3px solid rgba(121, 79, 39, 0.16)',
        boxShadow: '0 10px 0 rgba(92, 73, 48, 0.23), inset 0 0 0 12px rgba(255,255,255,0.22)',
        overflow: 'hidden',
    } as React.CSSProperties,
    route: {
        position: 'absolute' as const,
        inset: 44,
        borderRadius: '48%',
        border: '5px dashed rgba(121, 79, 39, 0.18)',
        transform: 'rotate(-14deg)',
    } as React.CSSProperties,
    dock: {
        position: 'absolute' as const,
        right: 28,
        bottom: 28,
        width: 150,
        height: 58,
        borderRadius: 999,
        background: '#9a835a',
        boxShadow: '0 6px 0 rgba(68, 48, 28, 0.28)',
    } as React.CSSProperties,
    mapCard: {
        position: 'absolute' as const,
        left: 24,
        top: 22,
        right: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '12px 15px',
        borderRadius: 24,
        background: 'rgba(255, 252, 244, 0.86)',
        border: '2px solid rgba(121, 79, 39, 0.12)',
        color: '#725d42',
        fontWeight: 900,
    } as React.CSSProperties,
    marker: {
        position: 'absolute' as const,
        width: 154,
        minHeight: 128,
        border: 'none',
        borderRadius: 28,
        padding: 14,
        color: '#ffffff',
        fontFamily: 'inherit',
        fontWeight: 900,
        textAlign: 'left' as const,
        boxShadow: '0 7px 0 rgba(93, 74, 49, 0.26)',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
    } as React.CSSProperties,
    section: {
        width: 'min(1180px, calc(100% - 48px))',
        margin: '0 auto',
        padding: '38px 0',
    } as React.CSSProperties,
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: 20,
        marginBottom: 20,
    } as React.CSSProperties,
    sectionTitle: {
        margin: 0,
        fontSize: 30,
        lineHeight: 1.12,
        color: '#794f27',
        fontWeight: 900,
    } as React.CSSProperties,
    sectionText: {
        maxWidth: 660,
        margin: '8px 0 0',
        color: '#5f4a32',
        lineHeight: 1.7,
        fontSize: 15,
        fontWeight: 650,
    } as React.CSSProperties,
    workGrid: {
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr 1fr',
        gap: 18,
        alignItems: 'start',
    } as React.CSSProperties,
    routeDeck: {
        position: 'relative' as const,
        minHeight: 450,
        borderRadius: '34px 26px 38px 30px / 30px 38px 26px 34px',
        background:
            'linear-gradient(135deg, rgba(230,249,246,0.76), rgba(255,252,244,0.62)), repeating-linear-gradient(90deg, transparent 0 58px, rgba(121,79,39,0.08) 59px 62px)',
        border: '2px dashed rgba(121, 79, 39, 0.18)',
        boxShadow: '0 6px 0 rgba(189, 174, 160, 0.42)',
        overflow: 'hidden',
        marginTop: 6,
    } as React.CSSProperties,
    deckLine: {
        position: 'absolute' as const,
        left: '8%',
        right: '8%',
        top: '50%',
        borderTop: '5px dashed rgba(121, 79, 39, 0.16)',
        transform: 'rotate(-2deg)',
    } as React.CSSProperties,
    projectCard: {
        minHeight: 288,
        padding: 20,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 14,
        cursor: 'pointer',
    } as React.CSSProperties,
    tagList: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: 8,
        marginTop: 'auto',
    } as React.CSSProperties,
    tag: {
        display: 'inline-flex',
        padding: '5px 10px',
        borderRadius: 999,
        background: 'rgba(255, 255, 255, 0.6)',
        fontSize: 11,
        fontWeight: 900,
        color: '#5f4a32',
    } as React.CSSProperties,
    methodGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 16,
    } as React.CSSProperties,
    methodCard: {
        minHeight: 236,
        padding: 18,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 12,
    } as React.CSSProperties,
    note: {
        display: 'grid',
        gridTemplateColumns: '0.88fr 1.12fr',
        gap: 22,
        alignItems: 'stretch',
    } as React.CSSProperties,
};

const markerPositions = [
    { left: '12%', top: '23%', background: '#f8a6b2' },
    { left: '56%', top: '26%', background: '#8ac68a' },
    { left: '33%', top: '62%', background: '#889df0' },
];

const desktopRouteSlots: React.CSSProperties[] = [
    {
        left: '32%',
        top: 42,
        width: '36%',
        zIndex: 4,
        transform: 'scale(1.04) rotate(0deg)',
    },
    {
        left: '4%',
        top: 96,
        width: '31%',
        zIndex: 2,
        transform: 'scale(0.93) rotate(-2.4deg)',
    },
    {
        left: '65%',
        top: 102,
        width: '31%',
        zIndex: 2,
        transform: 'scale(0.93) rotate(2.2deg)',
    },
];

const getRouteCardStyle = (visualIndex: number, isMobile: boolean): React.CSSProperties => {
    if (isMobile) {
        return {
            position: 'relative',
            width: '100%',
            transform: visualIndex === 0 ? 'translateY(-4px) scale(1.01)' : 'none',
            transition: 'transform 0.32s ease, box-shadow 0.32s ease',
        };
    }

    return {
        position: 'absolute',
        ...desktopRouteSlots[visualIndex],
        transition:
            'left 0.48s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.48s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.48s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.48s cubic-bezier(0.2, 0.8, 0.2, 1)',
    };
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const isMobile = useIsMobile();
    const [activeRouteIndex, setActiveRouteIndex] = useState(0);

    return (
        <div style={S.page}>
            <section
                style={{
                    ...S.hero,
                    padding: isMobile ? '76px 18px 24px' : S.hero.padding,
                    minHeight: isMobile ? 'auto' : S.hero.minHeight,
                }}
            >
                <div
                    style={{
                        ...S.heroInner,
                        gridTemplateColumns: isMobile ? '1fr' : S.heroInner.gridTemplateColumns,
                        gap: isMobile ? 22 : S.heroInner.gap,
                    }}
                >
                    <div style={{ ...S.passport, padding: isMobile ? 22 : S.passport.padding }}>
                        <div style={S.smallLabel}>
                            <Icon name="icon-variant" size={18} bounce />
                            Island Portfolio System
                        </div>
                        <h1 style={{ ...S.title, fontSize: isMobile ? 44 : S.title.fontSize }}>
                            {profile.name}
                        </h1>
                        <Typewriter speed={14} animalese animaleseVolume={0.04}>
                            <p style={{ ...S.subtitle, fontSize: isMobile ? 16 : S.subtitle.fontSize }}>
                                {profile.tagline}
                            </p>
                        </Typewriter>
                        <div style={S.actions}>
                            <Button type="primary" size="large" onClick={() => onNavigate?.('/work')}>
                                Explore Work
                            </Button>
                            <Button size="large" onClick={() => onNavigate?.('/vibe-coding')}>
                                View Build Log
                            </Button>
                            <Button size="large" onClick={() => onNavigate?.('/contact')}>
                                Contact
                            </Button>
                        </div>
                        <div
                            style={{
                                ...S.stampRow,
                                gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : S.stampRow.gridTemplateColumns,
                            }}
                        >
                            {studioStats.map((item) => (
                                <div key={item.label} style={S.stamp}>
                                    <span style={S.statValue}>{item.value}</span>
                                    <span style={S.statLabel}>{item.label}</span>
                                    <span style={S.statDetail}>{item.detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!isMobile && (
                        <div style={S.map} aria-label="Portfolio map">
                            <div style={S.route} />
                            <div style={S.mapCard}>
                                <span>Open Routes</span>
                                <span>{projects.length} active projects</span>
                            </div>
                            <div style={S.dock} />
                            {projects.map((project, index) => (
                                <button
                                    key={project.key}
                                    onClick={() => onNavigate?.(`/${project.key}`)}
                                    style={{ ...S.marker, ...markerPositions[index] }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.transform = 'translateY(-6px) rotate(-1deg)';
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.transform = 'none';
                                    }}
                                >
                                    <Icon name={project.icon} size={34} bounce />
                                    <span style={{ display: 'block', marginTop: 9, fontSize: 18 }}>
                                        {project.shortTitle}
                                    </span>
                                    <span style={{ display: 'block', marginTop: 5, fontSize: 11, opacity: 0.86 }}>
                                        {project.category}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section style={S.section}>
                <div
                    style={{
                        ...S.sectionHeader,
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'flex-start' : 'flex-end',
                    }}
                >
                    <div>
                        <h2 style={S.sectionTitle}>Selected Routes</h2>
                        <p style={S.sectionText}>
                            Three different kinds of work sit together here: a deep UX prototype,
                            a client website direction, and a redesign concept with clearer content paths.
                        </p>
                    </div>
                    <Button onClick={() => onNavigate?.('/work')}>Open Project Board</Button>
                </div>
                <div
                    style={{
                        ...S.routeDeck,
                        display: isMobile ? 'grid' : 'block',
                        gridTemplateColumns: isMobile ? '1fr' : undefined,
                        gap: isMobile ? 16 : undefined,
                        minHeight: isMobile ? 'auto' : S.routeDeck.minHeight,
                        padding: isMobile ? 0 : undefined,
                        border: isMobile ? 'none' : S.routeDeck.border,
                        background: isMobile ? 'transparent' : S.routeDeck.background,
                        boxShadow: isMobile ? 'none' : S.routeDeck.boxShadow,
                        overflow: isMobile ? 'visible' : S.routeDeck.overflow,
                    }}
                >
                    {!isMobile && <div style={S.deckLine} />}
                    {projects.map((project, index) => {
                        const visualIndex = (index - activeRouteIndex + projects.length) % projects.length;
                        const isActive = visualIndex === 0;

                        return (
                            <Card
                                key={project.key}
                                color={project.color}
                                role="button"
                                aria-pressed={isActive}
                                tabIndex={0}
                                style={{
                                    ...S.projectCard,
                                    ...getRouteCardStyle(visualIndex, isMobile),
                                    minHeight: isMobile ? 260 : isActive ? 312 : 286,
                                    boxShadow: isActive
                                        ? '0 10px 0 rgba(93, 74, 49, 0.28)'
                                        : '0 6px 0 rgba(93, 74, 49, 0.18)',
                                }}
                                onClick={() => setActiveRouteIndex(index)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        setActiveRouteIndex(index);
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Icon name={project.icon} size={42} bounce={isActive} />
                                    <span
                                        style={{
                                            padding: '6px 10px',
                                            borderRadius: 999,
                                            background: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.46)',
                                            color: '#5f4a32',
                                            fontSize: 12,
                                            fontWeight: 900,
                                        }}
                                    >
                                        {isActive ? 'Active Route' : 'Tap to move'}
                                    </span>
                                </div>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.78 }}>
                                        {project.status}
                                    </div>
                                    <h3 style={{ margin: '8px 0', fontSize: isActive ? 26 : 23, lineHeight: 1.08 }}>
                                        {project.shortTitle}
                                    </h3>
                                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.58, fontWeight: 750 }}>
                                        {project.summary}
                                    </p>
                                </div>
                                <div style={S.tagList}>
                                    {project.tags.slice(0, isActive ? 4 : 2).map((tag) => (
                                        <span key={tag} style={S.tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {isActive && (
                                    <div style={{ marginTop: 2 }}>
                                        <Button
                                            size="small"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                onNavigate?.(`/${project.key}`);
                                            }}
                                        >
                                            Open Case
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </section>

            <Divider type="wave-yellow" style={{ width: 'min(940px, calc(100% - 48px))', margin: '0 auto' }} />

            <section style={S.section}>
                <div style={S.sectionHeader}>
                    <div>
                        <h2 style={S.sectionTitle}>Studio Method</h2>
                        <p style={S.sectionText}>
                            A compact process system for turning research into something that can
                            be clicked, tested, and explained.
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        ...S.methodGrid,
                        gridTemplateColumns: isMobile ? '1fr' : S.methodGrid.gridTemplateColumns,
                    }}
                >
                    {methodCards.map((item, index) => (
                        <Card key={item.title} color={item.color} style={S.methodCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Icon name={item.icon} size={36} bounce />
                                <span style={{ fontWeight: 900, opacity: 0.72 }}>0{index + 1}</span>
                            </div>
                            <h3 style={{ margin: 0, fontSize: 21, lineHeight: 1.12 }}>{item.title}</h3>
                            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, fontWeight: 750 }}>
                                {item.description}
                            </p>
                            <div style={{ ...S.tagList, marginTop: 'auto' }}>
                                {item.tools.slice(0, 3).map((tool) => (
                                    <span key={tool} style={S.tag}>
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section style={{ ...S.section, paddingBottom: isMobile ? 110 : 120 }}>
                <div
                    style={{
                        ...S.note,
                        gridTemplateColumns: isMobile ? '1fr' : S.note.gridTemplateColumns,
                    }}
                >
                    <Card color="app-yellow" style={{ padding: 24 }}>
                        <Icon name="icon-camera" size={42} bounce />
                        <h2 style={{ ...S.sectionTitle, marginTop: 16 }}>What changed?</h2>
                        <p style={S.sectionText}>
                            This is no longer only a component showcase. It behaves like a portfolio:
                            routes, case studies, process evidence, experimental builds, and a
                            contact area all share one visual system.
                        </p>
                    </Card>
                    <Card style={{ padding: 24 }}>
                        <h2 style={S.sectionTitle}>Next content to plug in</h2>
                        <p style={S.sectionText}>
                            Add final screenshots for Lake Hills and WATC Camp, then replace the
                            contact placeholders with public links. The UI is ready for those assets.
                        </p>
                        <div style={{ ...S.actions, marginTop: 18 }}>
                            <Button onClick={() => onNavigate?.('/about')}>About Ziyu</Button>
                            <Button type="primary" onClick={() => onNavigate?.('/contact')}>
                                Finish Contact
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
