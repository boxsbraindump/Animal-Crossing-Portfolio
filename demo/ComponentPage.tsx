import React, { useMemo, useState } from 'react';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { Collapse } from '../src/components/Collapse';
import { Divider } from '../src/components/Divider';
import { Icon } from '../src/components/Icon';
import { Typewriter } from '../src/components/Typewriter';
import type { CardColor } from '../src/components/Card';
import {
    findProject,
    methodCards,
    profile,
    projects,
    studioStats,
    vibeProjects,
    type Project,
} from './portfolioData';
import { useIsMobile } from './useIsMobile';

const navigate = (path: string) => {
    window.location.hash = path;
};

const S = {
    shell: {
        width: 'min(1040px, 100%)',
        margin: '0 auto',
        color: '#725d42',
    } as React.CSSProperties,
    intro: {
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.7fr',
        gap: 22,
        alignItems: 'stretch',
        marginBottom: 24,
    } as React.CSSProperties,
    eyebrow: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: '#19c8b9',
        fontSize: 12,
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.8,
        marginBottom: 12,
    } as React.CSSProperties,
    title: {
        fontSize: 42,
        lineHeight: 1.08,
        color: '#794f27',
        margin: 0,
        fontWeight: 900,
    } as React.CSSProperties,
    body: {
        fontSize: 15,
        lineHeight: 1.75,
        color: '#725d42',
        margin: '14px 0 0',
        fontWeight: 500,
    } as React.CSSProperties,
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 18,
    } as React.CSSProperties,
    statStrip: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 12,
        margin: '0 0 24px',
    } as React.CSSProperties,
    statTile: {
        padding: 16,
        borderRadius: 18,
        background: 'rgba(255, 252, 244, 0.78)',
        border: '2px dashed rgba(159,146,125,0.34)',
    } as React.CSSProperties,
    filterBar: {
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap' as const,
        margin: '0 0 22px',
    } as React.CSSProperties,
    filterButton: (active: boolean) =>
        ({
            border: active ? '2px solid #19c8b9' : '2px solid rgba(159,146,125,0.42)',
            background: active ? '#82d5bb' : 'rgba(255,252,244,0.78)',
            color: active ? '#fff' : '#725d42',
            borderRadius: 999,
            padding: '9px 14px',
            fontFamily: 'inherit',
            fontSize: 13,
            fontWeight: 900,
            boxShadow: active ? '0 4px 0 #5a9e1e' : '0 4px 0 rgba(189,174,160,0.48)',
            cursor: 'pointer',
        }) as React.CSSProperties,
    twoGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 18,
    } as React.CSSProperties,
    card: {
        padding: 22,
    } as React.CSSProperties,
    sectionSurface: {
        padding: 30,
        marginTop: 28,
        overflow: 'hidden',
    } as React.CSSProperties,
    sectionIntro: {
        maxWidth: 760,
        marginBottom: 20,
    } as React.CSSProperties,
    split: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.92fr) minmax(0, 1.08fr)',
        gap: 26,
        alignItems: 'start',
    } as React.CSSProperties,
    softPanel: {
        padding: 18,
        borderRadius: 18,
        background: 'rgba(255,255,255,0.36)',
        border: '2px dashed rgba(159,146,125,0.38)',
    } as React.CSSProperties,
    columns: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 20,
    } as React.CSSProperties,
    threeColumns: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 16,
    } as React.CSSProperties,
    projectCard: {
        minHeight: 310,
        padding: 22,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 14,
    } as React.CSSProperties,
    label: {
        fontSize: 12,
        fontWeight: 900,
        color: '#9f927d',
        textTransform: 'uppercase' as const,
        letterSpacing: 0.8,
        marginBottom: 8,
    } as React.CSSProperties,
    tagList: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        gap: 8,
    } as React.CSSProperties,
    tag: {
        display: 'inline-flex',
        padding: '5px 10px',
        borderRadius: 999,
        background: '#e6f9f6',
        color: '#725d42',
        fontSize: 12,
        fontWeight: 800,
    } as React.CSSProperties,
    section: {
        marginTop: 28,
    } as React.CSSProperties,
    sectionTitle: {
        color: '#794f27',
        fontSize: 24,
        fontWeight: 900,
        margin: '0 0 14px',
    } as React.CSSProperties,
    list: {
        margin: 0,
        paddingLeft: 18,
        lineHeight: 1.75,
        fontSize: 14,
        fontWeight: 500,
    } as React.CSSProperties,
    mediaGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 18,
    } as React.CSSProperties,
    phoneGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 14,
    } as React.CSSProperties,
    mediaCard: {
        padding: 12,
        overflow: 'hidden',
    } as React.CSSProperties,
    mediaFigure: {
        margin: 0,
        padding: 0,
    } as React.CSSProperties,
    mediaImage: {
        width: '100%',
        display: 'block',
        borderRadius: 16,
        background: '#f8f8f0',
    } as React.CSSProperties,
    caption: {
        margin: '10px 4px 2px',
        fontSize: 12,
        color: '#725d42',
        fontWeight: 800,
        lineHeight: 1.35,
    } as React.CSSProperties,
    phoneImage: {
        width: '100%',
        display: 'block',
        borderRadius: 22,
        background: '#f8f8f0',
        boxShadow: '0 5px 0 rgba(93,74,49,0.14)',
    } as React.CSSProperties,
    questRoute: {
        position: 'relative' as const,
        minHeight: 150,
        marginBottom: 28,
        borderRadius: '32px 28px 36px 24px / 28px 36px 24px 32px',
        background: 'linear-gradient(135deg, rgba(230,249,246,0.92), rgba(247,243,223,0.88))',
        border: '2px solid rgba(159, 146, 125, 0.34)',
        boxShadow: '0 6px 0 rgba(189, 174, 160, 0.42)',
        overflow: 'hidden',
    } as React.CSSProperties,
    questLine: {
        position: 'absolute' as const,
        left: '10%',
        right: '10%',
        top: '50%',
        borderTop: '5px dashed rgba(121, 79, 39, 0.2)',
        transform: 'rotate(-2deg)',
    } as React.CSSProperties,
    questStop: {
        position: 'absolute' as const,
        width: 146,
        border: 'none',
        borderRadius: 24,
        padding: 13,
        color: '#725d42',
        fontFamily: 'inherit',
        fontWeight: 900,
        textAlign: 'left' as const,
        boxShadow: '0 5px 0 rgba(93, 74, 49, 0.24)',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
    } as React.CSSProperties,
    questStamp: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: '#f8f8f0',
        color: '#19c8b9',
        fontSize: 13,
        fontWeight: 900,
        marginBottom: 8,
    } as React.CSSProperties,
    vibeTrail: {
        display: 'grid',
        gap: 18,
    } as React.CSSProperties,
    vibeRow: {
        display: 'grid',
        gridTemplateColumns: '190px minmax(0, 1fr)',
        gap: 22,
        alignItems: 'start',
        padding: '22px 0',
        borderTop: '2px dashed rgba(159,146,125,0.34)',
    } as React.CSSProperties,
    vibeBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 11px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.58)',
        color: '#725d42',
        fontSize: 12,
        fontWeight: 900,
        lineHeight: 1,
    } as React.CSSProperties,
    vibeMiniGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 18,
        marginTop: 18,
    } as React.CSSProperties,
    vibeProofGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 12,
        marginTop: 16,
    } as React.CSSProperties,
    vibeProofTile: {
        padding: 16,
        borderRadius: 18,
        background: 'rgba(255,255,255,0.7)',
        color: '#725d42',
    } as React.CSSProperties,
    playableFrame: {
        width: '100%',
        height: 620,
        border: 'none',
        borderRadius: 22,
        background: '#f8fafc',
        boxShadow: '0 7px 0 rgba(93, 74, 49, 0.2)',
    } as React.CSSProperties,
};

const focusColors: CardColor[] = ['app-teal', 'app-yellow', 'lime-green', 'warm-peach-pink'];
const projectFilters = ['All', 'Academic prototype', 'Client website', 'Redesign concept'] as const;
const routeStops = [
    { left: '8%', top: 18, background: '#f8a6b2' },
    { left: '43%', top: 48, background: '#8ac68a' },
    { right: '8%', top: 24, background: '#889df0' },
];

const mediaByKind = (project: Project, kind: NonNullable<Project['media']>[number]['kind']) =>
    project.media?.filter((item) => item.kind === kind) ?? [];

const stackColumns = (isMobile: boolean, desktop: React.CSSProperties) => ({
    ...desktop,
    gridTemplateColumns: isMobile ? '1fr' : desktop.gridTemplateColumns,
});

const publicAssetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const PageHeader: React.FC<{
    eyebrow: string;
    title: string;
    children: React.ReactNode;
}> = ({ eyebrow, title, children }) => {
    const isMobile = useIsMobile();

    return (
        <div
            style={{
                ...S.intro,
                gridTemplateColumns: isMobile ? '1fr' : S.intro.gridTemplateColumns,
            }}
        >
            <Card style={{ ...S.card, padding: isMobile ? 20 : 28 }}>
                <div style={S.eyebrow}>
                    <Icon name="icon-variant" size={18} bounce />
                    {eyebrow}
                </div>
                <h1 style={{ ...S.title, fontSize: isMobile ? 32 : 42 }}>{title}</h1>
                <Typewriter speed={12} animalese animaleseVolume={0.035}>
                    <div>{children}</div>
                </Typewriter>
            </Card>
            <Card color="app-yellow" style={{ ...S.card, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Icon name="icon-camera" size={44} bounce />
                <div>
                    <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.7 }}>Current focus</div>
                    <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.15, marginTop: 8 }}>
                        Research-informed design that can be clicked, tested, and improved.
                    </div>
                </div>
            </Card>
        </div>
    );
};

const ProjectSummaryCard: React.FC<{ project: Project; index: number; isMobile: boolean }> = ({
    project,
    index,
    isMobile,
}) => (
    <Card
        color={project.color}
        style={{
            ...S.projectCard,
            marginTop: isMobile ? 0 : index === 1 ? 38 : index === 2 ? 12 : 0,
            transform: isMobile ? 'none' : index === 1 ? 'rotate(1deg)' : 'rotate(-0.6deg)',
        }}
        onClick={() => navigate(`/${project.key}`)}
    >
        <Icon name={project.icon} size={42} bounce />
        <div>
            <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.78 }}>{project.status}</div>
            <h2 style={{ margin: '8px 0', fontSize: 24, lineHeight: 1.12 }}>{project.shortTitle}</h2>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.58, fontWeight: 700 }}>
                {project.summary}
            </p>
        </div>
        <div style={{ ...S.tagList, marginTop: 'auto' }}>
            {project.tags.map((tag) => (
                <span key={tag} style={{ ...S.tag, background: 'rgba(255,255,255,0.6)' }}>
                    {tag}
                </span>
            ))}
        </div>
    </Card>
);

const WorkPage: React.FC = () => {
    const isMobile = useIsMobile();
    const [activeFilter, setActiveFilter] = useState<(typeof projectFilters)[number]>('All');
    const visibleProjects = useMemo(
        () =>
            activeFilter === 'All'
                ? projects
                : projects.filter((project) => project.status === activeFilter),
        [activeFilter],
    );

    return (
        <div style={S.shell}>
            <PageHeader eyebrow="Selected work" title="Projects with research, structure, and interactive thinking.">
                <p style={S.body}>
                    This portfolio balances three kinds of evidence: a complete academic UX case
                    study, a real client website, and a responsive redesign concept.
                </p>
            </PageHeader>
            <div
                style={{
                    ...S.statStrip,
                    gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : S.statStrip.gridTemplateColumns,
                }}
            >
                {studioStats.map((item) => (
                    <div key={item.label} style={S.statTile}>
                        <div style={{ fontSize: 25, fontWeight: 900, color: '#19c8b9', lineHeight: 1 }}>
                            {item.value}
                        </div>
                        <div style={{ marginTop: 7, fontSize: 12, fontWeight: 900, color: '#794f27' }}>
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
            {!isMobile && (
                <div style={S.questRoute}>
                    <div style={S.questLine} />
                    {projects.map((project, index) => (
                        <button
                            key={project.key}
                            style={{ ...S.questStop, ...routeStops[index] }}
                            onClick={() => navigate(`/${project.key}`)}
                            onMouseEnter={(event) => {
                                event.currentTarget.style.transform = 'translateY(-4px)';
                            }}
                            onMouseLeave={(event) => {
                                event.currentTarget.style.transform = 'none';
                            }}
                        >
                            <span style={S.questStamp}>0{index + 1}</span>
                            <span style={{ display: 'block', fontSize: 16 }}>{project.shortTitle}</span>
                            <span style={{ display: 'block', fontSize: 11, opacity: 0.72, marginTop: 3 }}>
                                {project.status}
                            </span>
                        </button>
                    ))}
                </div>
            )}
            <div style={S.filterBar} aria-label="Project filters">
                {projectFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        style={S.filterButton(activeFilter === filter)}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <div style={stackColumns(isMobile, S.grid)}>
                {visibleProjects.map((project, index) => (
                    <ProjectSummaryCard key={project.key} project={project} index={index} isMobile={isMobile} />
                ))}
            </div>
        </div>
    );
};

const MediaFigure: React.FC<{
    item: NonNullable<Project['media']>[number];
    phone?: boolean;
}> = ({ item, phone = false }) => (
    <figure style={S.mediaFigure}>
        <img
            src={item.src}
            alt={item.alt}
            style={phone ? S.phoneImage : S.mediaImage}
            loading="lazy"
        />
        <figcaption style={S.caption}>{item.caption}</figcaption>
    </figure>
);

const ProjectPage: React.FC<{ project: Project }> = ({ project }) => {
    const isMobile = useIsMobile();
    const heroMedia = mediaByKind(project, 'hero');
    const screenMedia = mediaByKind(project, 'screen');
    const researchMedia = mediaByKind(project, 'research');
    const personaMedia = mediaByKind(project, 'persona');
    const processMedia = mediaByKind(project, 'process');
    const prototypeMedia = mediaByKind(project, 'prototype');
    const caseStudy = project.caseStudy;

    return (
        <div style={S.shell}>
            <div
                style={{
                    ...S.intro,
                    gridTemplateColumns: isMobile ? '1fr' : S.intro.gridTemplateColumns,
                }}
            >
                <Card style={{ ...S.card, padding: isMobile ? 20 : 30 }}>
                    <div style={S.eyebrow}>
                        <Icon name={project.icon} size={18} bounce />
                        {project.status}
                    </div>
                    <h1 style={{ ...S.title, fontSize: isMobile ? 32 : 44 }}>{project.title}</h1>
                    <p style={S.body}>{project.summary}</p>
                    <div style={{ ...S.tagList, marginTop: 18 }}>
                        {project.tags.map((tag) => (
                            <span key={tag} style={S.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    {project.prototypeUrl && (
                        <div style={{ marginTop: 18 }}>
                            <Button
                                type="primary"
                                onClick={() => window.open(project.prototypeUrl, '_blank', 'noopener,noreferrer')}
                            >
                                Open Prototype
                            </Button>
                        </div>
                    )}
                </Card>
                <Card color={project.color} style={{ ...S.card, display: 'grid', gap: 15 }}>
                    <div>
                        <div style={S.label}>Quest Type</div>
                        <div style={{ fontWeight: 900 }}>{project.category}</div>
                    </div>
                    <div>
                        <div style={S.label}>Player Role</div>
                        <div style={{ fontWeight: 800, lineHeight: 1.45 }}>{project.role}</div>
                    </div>
                    <div>
                        <div style={S.label}>Save File</div>
                        <div style={{ fontWeight: 900 }}>{project.timeframe}</div>
                    </div>
                </Card>
            </div>

            {(heroMedia.length > 0 || prototypeMedia.length > 0) && (
                <Card style={S.sectionSurface}>
                    <div style={stackColumns(isMobile, S.mediaGrid)}>
                        {[...heroMedia, ...prototypeMedia.slice(0, 1)].map((item) => (
                            <MediaFigure key={item.src} item={item} />
                        ))}
                    </div>
                </Card>
            )}

            <Card style={S.sectionSurface}>
                <div
                    style={{
                        ...S.split,
                        gridTemplateColumns: isMobile ? '1fr' : S.split.gridTemplateColumns,
                    }}
                >
                    <div>
                        <h2 style={S.sectionTitle}>Quest Brief</h2>
                        <p style={S.body}>{caseStudy?.problem ?? project.challenge}</p>
                    </div>
                    <div style={S.softPanel}>
                        <h2 style={S.sectionTitle}>Result</h2>
                        <p style={S.body}>{project.outcome}</p>
                    </div>
                </div>
            </Card>

            {caseStudy && (
                <Card style={S.sectionSurface}>
                    <div style={S.sectionIntro}>
                        <h2 style={S.sectionTitle}>Research Hunt</h2>
                        <p style={S.body}>{caseStudy.huntStatement}</p>
                    </div>
                    <div
                        style={{
                            ...S.columns,
                            gridTemplateColumns: isMobile ? '1fr' : S.columns.gridTemplateColumns,
                        }}
                    >
                        <div>
                            <div style={S.label}>Why NekoPaw?</div>
                            <ul style={S.list}>
                                {caseStudy.why.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div style={S.softPanel}>
                            <div style={S.label}>Method</div>
                            {caseStudy.methods.map((method) => (
                                <p key={method.title} style={S.body}>
                                    <strong>{method.title}:</strong> {method.details}
                                </p>
                            ))}
                        </div>
                    </div>
                    {researchMedia.length > 0 && (
                        <div
                            style={{
                                ...S.mediaGrid,
                                gridTemplateColumns: isMobile ? '1fr' : S.mediaGrid.gridTemplateColumns,
                                marginTop: 24,
                            }}
                        >
                            {researchMedia.map((item) => (
                                <MediaFigure key={item.src} item={item} />
                            ))}
                        </div>
                    )}
                </Card>
            )}

            {caseStudy && (
                <Card style={S.sectionSurface}>
                    <h2 style={S.sectionTitle}>Findings and Opportunities</h2>
                    <div
                        style={{
                            ...S.columns,
                            gridTemplateColumns: isMobile ? '1fr' : S.columns.gridTemplateColumns,
                        }}
                    >
                        <div>
                            <div style={S.label}>Survey Findings</div>
                            <ul style={S.list}>
                                {caseStudy.surveyFindings.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div style={S.label}>Interview Findings</div>
                            <ul style={S.list}>
                                {caseStudy.interviewFindings.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{ ...S.softPanel, marginTop: 24 }}>
                        <div style={S.label}>Opportunity Unlocks</div>
                        <ul style={S.list}>
                            {caseStudy.opportunities.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Card>
            )}

            {caseStudy && personaMedia.length > 0 && (
                <Card style={S.sectionSurface}>
                    <div style={S.sectionIntro}>
                        <h2 style={S.sectionTitle}>Personas</h2>
                        <p style={S.body}>{caseStudy.personaSummary}</p>
                    </div>
                    <div
                        style={{
                            ...S.mediaGrid,
                            gridTemplateColumns: isMobile ? '1fr' : S.mediaGrid.gridTemplateColumns,
                        }}
                    >
                        {personaMedia.map((item) => (
                            <MediaFigure key={item.src} item={item} />
                        ))}
                    </div>
                </Card>
            )}

            <Card style={S.sectionSurface}>
                <h2 style={S.sectionTitle}>Route Taken</h2>
                <div
                    style={{
                        ...S.columns,
                        gridTemplateColumns: isMobile ? '1fr' : S.columns.gridTemplateColumns,
                    }}
                >
                    <div>
                        <div style={S.label}>Project Checkpoints</div>
                        <ol style={S.list}>
                            {project.approach.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ol>
                    </div>
                    {caseStudy && (
                        <div style={S.softPanel}>
                            <div style={S.label}>Design Process Details</div>
                            {caseStudy.designProcess.map((item) => (
                                <p key={item.title} style={S.body}>
                                    <strong>{item.title}:</strong> {item.details}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                {processMedia.length > 0 && (
                    <div
                        style={{
                            ...S.mediaGrid,
                            gridTemplateColumns: isMobile ? '1fr' : S.mediaGrid.gridTemplateColumns,
                            marginTop: 24,
                        }}
                    >
                        {processMedia.map((item) => (
                            <MediaFigure key={item.src} item={item} />
                        ))}
                    </div>
                )}
            </Card>

            {screenMedia.length > 0 && (
                <Card style={S.sectionSurface}>
                    <h2 style={S.sectionTitle}>Prototype Screens</h2>
                    <div
                        style={{
                            ...S.phoneGrid,
                            gridTemplateColumns: isMobile ? '1fr 1fr' : S.phoneGrid.gridTemplateColumns,
                        }}
                    >
                        {screenMedia.map((item) => (
                            <MediaFigure key={item.src} item={item} phone />
                        ))}
                    </div>
                </Card>
            )}

            {caseStudy && (
                <Card style={S.sectionSurface}>
                    <h2 style={S.sectionTitle}>Usability Test</h2>
                    <div
                        style={{
                            ...S.split,
                            gridTemplateColumns: isMobile ? '1fr' : S.split.gridTemplateColumns,
                        }}
                    >
                        <div style={S.softPanel}>
                            <div style={S.label}>Where</div>
                            <div style={{ fontWeight: 900 }}>{caseStudy.usabilityTest.where}</div>
                            <div style={{ ...S.label, marginTop: 14 }}>When</div>
                            <div style={{ fontWeight: 900 }}>{caseStudy.usabilityTest.when}</div>
                            <div style={{ ...S.label, marginTop: 14 }}>Participants</div>
                            <div style={{ fontWeight: 900, fontSize: 38 }}>
                                {caseStudy.usabilityTest.participants}
                            </div>
                        </div>
                        <div>
                            {caseStudy.usabilityTest.description.map((item) => (
                                <p key={item} style={S.body}>
                                    {item}
                                </p>
                            ))}
                            <div style={S.label}>Insights and Feedback</div>
                            <ul style={S.list}>
                                {caseStudy.usabilityTest.feedback.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>
            )}

            <Card style={S.sectionSurface}>
                <div
                    style={{
                        ...S.columns,
                        gridTemplateColumns: isMobile ? '1fr' : S.columns.gridTemplateColumns,
                    }}
                >
                    <div>
                        <h2 style={S.sectionTitle}>Inventory</h2>
                        <ul style={S.list}>
                            {project.evidence.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div style={S.softPanel}>
                        <h2 style={S.sectionTitle}>Next Unlocks</h2>
                        <ul style={S.list}>
                            {project.nextSteps.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            <Divider type="line-teal" style={{ margin: '34px 0' }} />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button onClick={() => navigate('/work')}>Back to Work</Button>
                {project.prototypeUrl && (
                    <Button
                        type="primary"
                        onClick={() => window.open(project.prototypeUrl, '_blank', 'noopener,noreferrer')}
                    >
                        Open Prototype
                    </Button>
                )}
            </div>
        </div>
    );
};

const VibeCodingPage: React.FC = () => {
    const isMobile = useIsMobile();

    return (
        <div style={S.shell}>
            <PageHeader eyebrow="Vibe coding projects" title="AI-assisted prototypes, treated like real design work.">
                <p style={S.body}>
                    I use vibe coding as a fast prototyping workflow: describe the product idea,
                    shape the interaction and visual direction, then keep editing the working
                    interface until it feels usable, responsive, and portfolio-ready.
                </p>
            </PageHeader>

            <Card style={{ ...S.sectionSurface, padding: isMobile ? 20 : 32 }}>
                <div style={S.sectionIntro}>
                    <h2 style={S.sectionTitle}>Experiment Log</h2>
                    <p style={S.body}>
                        These projects show frontend execution, UI judgement, and the ability to
                        turn fuzzy design ideas into something people can actually click through.
                        They are labeled separately from client and academic UX work, so the
                        portfolio stays honest.
                    </p>
                </div>

                <div style={S.vibeTrail}>
                    {vibeProjects.map((project, index) => (
                        <div
                            key={project.key}
                            style={{
                                ...S.vibeRow,
                                gridTemplateColumns: isMobile
                                    ? '1fr'
                                    : project.embedPath
                                      ? '240px minmax(0, 1fr)'
                                      : S.vibeRow.gridTemplateColumns,
                                borderTop: index === 0 ? 'none' : S.vibeRow.borderTop,
                                paddingTop: index === 0 ? 4 : 22,
                            }}
                        >
                            <div>
                                <Card color={project.color} style={{ padding: 18 }}>
                                    <Icon name={project.icon} size={38} bounce />
                                    <h3 style={{ margin: '12px 0 8px', fontSize: 22, lineHeight: 1.12 }}>
                                        {project.title}
                                    </h3>
                                    {project.metrics && (
                                        <div style={S.vibeProofGrid}>
                                            {project.metrics.map((metric) => (
                                                <div key={metric.label} style={S.vibeProofTile}>
                                                    <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1 }}>
                                                        {metric.value}
                                                    </div>
                                                    <div style={{ marginTop: 5, fontSize: 12, fontWeight: 900 }}>
                                                        {metric.label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div style={{ display: 'grid', gap: 8 }}>
                                        <span style={S.vibeBadge}>{project.type}</span>
                                        <span style={S.vibeBadge}>{project.status}</span>
                                    </div>
                                </Card>
                            </div>
                            <div>
                                <p style={{ ...S.body, marginTop: 0 }}>{project.summary}</p>
                                {project.proofNote && (
                                    <Card type="dashed" style={{ padding: 16, marginTop: 14 }}>
                                        <div style={S.label}>Engagement proof</div>
                                        <p style={{ ...S.body, margin: 0 }}>{project.proofNote}</p>
                                    </Card>
                                )}
                                {project.embedPath && (
                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                                        <Button
                                            type="primary"
                                            onClick={() => window.open(publicAssetUrl(project.embedPath!), '_blank', 'noopener,noreferrer')}
                                        >
                                            Open Full Screen
                                        </Button>
                                        {project.sourceUrl && (
                                            <Button
                                                onClick={() => window.open(project.sourceUrl, '_blank', 'noopener,noreferrer')}
                                            >
                                                Source
                                            </Button>
                                        )}
                                    </div>
                                )}
                                {!project.embedPath && (
                                    <div
                                        style={{
                                            ...S.vibeMiniGrid,
                                            gridTemplateColumns: isMobile ? '1fr' : S.vibeMiniGrid.gridTemplateColumns,
                                        }}
                                    >
                                        <div>
                                            <div style={S.label}>What I designed</div>
                                            <ul style={S.list}>
                                                {project.whatIDesigned.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div style={S.softPanel}>
                                            <div style={S.label}>What I built</div>
                                            <ul style={S.list}>
                                                {project.whatIBuilt.map((item) => (
                                                    <li key={item}>{item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                <div style={{ ...S.tagList, marginTop: 18 }}>
                                    {project.tools.slice(0, project.embedPath ? 4 : project.tools.length).map((tool) => (
                                        <span key={tool} style={S.tag}>
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                                {project.embedPath && (
                                    <div style={{ marginTop: 22 }}>
                                        <iframe
                                            title={`${project.title} playable demo`}
                                            src={publicAssetUrl(project.embedPath)}
                                            style={{
                                                ...S.playableFrame,
                                                height: isMobile ? 580 : S.playableFrame.height,
                                            }}
                                            loading="lazy"
                                            allow="fullscreen"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card color="app-green" style={S.sectionSurface}>
                <div
                    style={{
                        ...S.columns,
                        gridTemplateColumns: isMobile ? '1fr' : S.columns.gridTemplateColumns,
                    }}
                >
                    <div>
                        <h2 style={S.sectionTitle}>How to present this</h2>
                        <p style={S.body}>
                            On resumes or interviews, this can be called AI-assisted frontend
                            prototyping. It communicates the same workflow as vibe coding, but in a
                            more professional way.
                        </p>
                    </div>
                    <div style={S.softPanel}>
                        <div style={S.label}>Portfolio Signal</div>
                        <ul style={S.list}>
                            <li>Fast interaction design iteration</li>
                            <li>Working responsive UI instead of only static screens</li>
                            <li>Comfort with React, TypeScript, and deployment-ready structure</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const AboutPage: React.FC = () => {
    const isMobile = useIsMobile();

    return (
        <div style={S.shell}>
            <PageHeader eyebrow="About" title={`${profile.name} designs interfaces with a maker's mindset.`}>
                <p style={S.body}>
                    I am building a UI/UX + frontend portfolio around thoughtful product structure,
                    warm visual systems, and fast interactive prototyping. My workflow uses AI as a
                    coding collaborator, while the design decisions stay grounded in user needs,
                    hierarchy, testing, and iteration.
                </p>
            </PageHeader>
            <div style={stackColumns(isMobile, S.grid)}>
                {profile.focus.map((item, index) => (
                    <Card key={item} color={focusColors[index]} style={S.card}>
                        <div style={S.label}>Focus 0{index + 1}</div>
                        <h2 style={{ margin: 0, fontSize: 22, lineHeight: 1.16 }}>{item}</h2>
                    </Card>
                ))}
            </div>
            <section style={S.section}>
                <h2 style={S.sectionTitle}>Studio Snapshot</h2>
                <div
                    style={{
                        ...S.statStrip,
                        gridTemplateColumns: isMobile ? '1fr' : S.statStrip.gridTemplateColumns,
                    }}
                >
                    {studioStats.map((item) => (
                        <div key={item.label} style={S.statTile}>
                            <div style={{ fontSize: 26, fontWeight: 900, color: '#19c8b9' }}>{item.value}</div>
                            <div style={{ fontSize: 13, fontWeight: 900, color: '#794f27' }}>{item.label}</div>
                            <p style={{ ...S.body, margin: '8px 0 0', fontSize: 12, lineHeight: 1.45 }}>
                                {item.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <section style={S.section}>
                <h2 style={S.sectionTitle}>Method Cards</h2>
                <div
                    style={{
                        ...S.grid,
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, minmax(0, 1fr))',
                    }}
                >
                    {methodCards.map((item, index) => (
                        <Card key={item.title} color={item.color} style={{ ...S.card, minHeight: 218 }}>
                            <Icon name={item.icon} size={34} bounce />
                            <div style={{ marginTop: 12, fontSize: 12, fontWeight: 900, opacity: 0.74 }}>
                                Method 0{index + 1}
                            </div>
                            <h3 style={{ margin: '7px 0', fontSize: 20, lineHeight: 1.12 }}>
                                {item.title}
                            </h3>
                            <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5, fontWeight: 700 }}>
                                {item.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>
            <section style={S.section}>
                <h2 style={S.sectionTitle}>Working Principles</h2>
                <Collapse
                    defaultExpanded
                    question="Prototype early enough to learn from the idea."
                    answer="I use clickable flows and AI-assisted frontend prototypes to make interface decisions concrete, easier to critique, and easier to improve."
                />
                <Collapse
                    question="Make the path clearer before making it prettier."
                    answer="Information architecture, hierarchy, labels, and task flow come first. Visual style should support the user's next decision."
                />
                <Collapse
                    question="Be honest about project context."
                    answer="Academic prototypes, client work, and redesign concepts each prove different skills, so the portfolio labels them clearly."
                />
            </section>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const isMobile = useIsMobile();

    return (
        <div style={S.shell}>
            <PageHeader eyebrow="Contact" title="Let's make this portfolio ready to send.">
                <p style={S.body}>
                    The contact section is structured for public links, resume access, and deployment
                    notes. Swap in final URLs when they are ready.
                </p>
            </PageHeader>
            <div
                style={{
                    ...S.twoGrid,
                    gridTemplateColumns: isMobile ? '1fr' : S.twoGrid.gridTemplateColumns,
                }}
            >
                <Card style={S.card}>
                    <div style={S.label}>Public links to add</div>
                    <ul style={S.list}>
                        <li>Email</li>
                        <li>LinkedIn</li>
                        <li>Resume PDF</li>
                        <li>Figma, Behance, Dribbble, or GitHub if relevant</li>
                    </ul>
                </Card>
                <Card color="app-teal" style={S.card}>
                    <Icon name="icon-helicopter" size={42} bounce />
                    <h2 style={{ margin: '14px 0 8px', fontSize: 24 }}>Ready for Cloudflare</h2>
                    <p style={{ ...S.body, margin: 0 }}>
                        This site is being shaped as a static Vite portfolio that can deploy cleanly to
                        Cloudflare Pages.
                    </p>
                </Card>
            </div>
            <Card color="app-yellow" style={{ ...S.sectionSurface, marginTop: 24 }}>
                <div
                    style={{
                        ...S.columns,
                        gridTemplateColumns: isMobile ? '1fr' : S.columns.gridTemplateColumns,
                    }}
                >
                    <div>
                        <h2 style={S.sectionTitle}>Send-ready checklist</h2>
                        <p style={S.body}>
                            The UI now has a place for every link a reviewer expects. Once the
                            project screenshots and final contact links are added, the portfolio can
                            be deployed and shared.
                        </p>
                    </div>
                    <div style={S.softPanel}>
                        <div style={S.label}>Before launch</div>
                        <ul style={S.list}>
                            <li>Replace placeholders with real contact URLs.</li>
                            <li>Add final Lake Hills and WATC Camp images.</li>
                            <li>Run the production demo build.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const ComponentPage: React.FC<{ activeKey: string }> = ({ activeKey }) => {
    const project = findProject(activeKey);

    if (project) return <ProjectPage project={project} />;
    if (activeKey === 'work') return <WorkPage />;
    if (activeKey === 'vibe-coding') return <VibeCodingPage />;
    if (activeKey === 'about') return <AboutPage />;
    if (activeKey === 'contact') return <ContactPage />;

    return <WorkPage />;
};

export default ComponentPage;
