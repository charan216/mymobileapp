import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';

type ProjectStatus = 'planning' | 'in-progress' | 'on-hold' | 'completed';
type Project = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: ProjectStatus;
  progress: number;
  budget: string;
  spent: string;
  startDate: string;
  targetDate: string;
  contractor: string;
  milestones: {label: string; done: boolean}[];
};

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Living Room Renovation',
    description: 'Full living room makeover — new false ceiling, recessed lighting, feature wall with textured finish, and modular TV unit.',
    icon: '🛋️',
    color: '#4F6EF7',
    status: 'in-progress',
    progress: 65,
    budget: '₹1,20,000',
    spent: '₹78,000',
    startDate: '1 Jan 2026',
    targetDate: '30 Apr 2026',
    contractor: 'Ganesh Interiors — 📞 90001 23456',
    milestones: [
      {label: 'Demolition & prep work', done: true},
      {label: 'Electrical wiring update', done: true},
      {label: 'False ceiling installation', done: true},
      {label: 'Textured feature wall', done: false},
      {label: 'Flooring & skirting', done: false},
      {label: 'Modular TV unit install', done: false},
      {label: 'Painting & finishing', done: false},
    ],
  },
  {
    id: '2',
    title: 'Smart Home Setup',
    description: 'Install smart switches, automated curtains, smart door lock, and voice-controlled lighting throughout the apartment.',
    icon: '🤖',
    color: '#06B6D4',
    status: 'in-progress',
    progress: 45,
    budget: '₹65,000',
    spent: '₹29,500',
    startDate: '15 Feb 2026',
    targetDate: '31 May 2026',
    contractor: 'TechHome Solutions — 📞 98765 11111',
    milestones: [
      {label: 'Smart switches — master bedroom', done: true},
      {label: 'Smart switches — living room', done: true},
      {label: 'Smart door lock installed', done: false},
      {label: 'Automated curtains — living room', done: false},
      {label: 'Smart AC controllers', done: false},
      {label: 'Central hub & app setup', done: false},
    ],
  },
  {
    id: '3',
    title: 'Balcony Garden',
    description: 'Transform the balcony into a lush urban garden with raised planters, vertical wall garden, drip irrigation, and cosy seating.',
    icon: '🌿',
    color: '#10B981',
    status: 'in-progress',
    progress: 30,
    budget: '₹25,000',
    spent: '₹7,500',
    startDate: '1 Mar 2026',
    targetDate: '30 Apr 2026',
    contractor: 'Ramesh Naidu (Gardener) — 📞 88765 43210',
    milestones: [
      {label: 'Waterproofing balcony floor', done: true},
      {label: 'Install raised wooden planters', done: false},
      {label: 'Vertical garden wall frame', done: false},
      {label: 'Drip irrigation setup', done: false},
      {label: 'Plant saplings & seeds', done: false},
      {label: 'Outdoor seating & lights', done: false},
    ],
  },
  {
    id: '4',
    title: 'Kitchen Upgrade',
    description: 'Upgrade kitchen with new modular cabinets, granite countertop, under-cabinet lighting, and stainless steel sink with pull-out faucet.',
    icon: '🍳',
    color: '#E67E22',
    status: 'planning',
    progress: 10,
    budget: '₹2,50,000',
    spent: '₹0',
    startDate: 'TBD',
    targetDate: 'Aug 2026',
    contractor: 'Getting quotes from 3 vendors',
    milestones: [
      {label: 'Finalize design & vendor', done: false},
      {label: 'Remove old cabinets', done: false},
      {label: 'Plumbing & electrical rough-in', done: false},
      {label: 'Install new modular cabinets', done: false},
      {label: 'Granite countertop fitting', done: false},
      {label: 'Appliances & fixtures', done: false},
      {label: 'Tiling & final finish', done: false},
    ],
  },
  {
    id: '5',
    title: 'Master Bathroom Makeover',
    description: 'Replace old tiles, install new shower enclosure with rain shower, floating vanity, heated towel rail, and mood lighting.',
    icon: '🛁',
    color: '#EC4899',
    status: 'on-hold',
    progress: 0,
    budget: '₹95,000',
    spent: '₹0',
    startDate: 'Oct 2026',
    targetDate: 'Dec 2026',
    contractor: 'Not selected yet',
    milestones: [
      {label: 'Design finalisation', done: false},
      {label: 'Tile demolition', done: false},
      {label: 'Waterproofing', done: false},
      {label: 'Plumbing works', done: false},
      {label: 'New tiling', done: false},
      {label: 'Fixtures & fittings', done: false},
    ],
  },
];

const statusConfig: Record<ProjectStatus, {color: string; bg: string; label: string}> = {
  planning: {color: '#3B82F6', bg: '#DBEAFE', label: '📐 Planning'},
  'in-progress': {color: '#F59E0B', bg: '#FEF3C7', label: '🔨 In Progress'},
  'on-hold': {color: '#6B7280', bg: '#F3F4F6', label: '⏸ On Hold'},
  completed: {color: '#27AE60', bg: '#D1FAE5', label: '✅ Completed'},
};

const ProjectsScreen = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  const totalBudget = '₹5,55,000';
  const totalSpent = '₹1,15,000';
  const active = PROJECTS.filter(p => p.status === 'in-progress').length;

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>🔨 Home Projects</Text>
          <Text style={styles.heroSub}>Plan, track & complete your home upgrades</Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{PROJECTS.length}</Text>
              <Text style={styles.heroStatLabel}>Projects</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{active}</Text>
              <Text style={styles.heroStatLabel}>Active</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{totalBudget}</Text>
              <Text style={styles.heroStatLabel}>Total Budget</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{totalSpent}</Text>
              <Text style={styles.heroStatLabel}>Spent</Text>
            </View>
          </View>
        </View>

        {PROJECTS.map(project => {
          const s = statusConfig[project.status];
          const doneMilestones = project.milestones.filter(m => m.done).length;
          return (
            <TouchableOpacity
              key={project.id}
              style={styles.card}
              onPress={() => setSelected(project)}
              activeOpacity={0.85}>
              <View style={styles.cardTop}>
                <View style={[styles.projectIcon, {backgroundColor: project.color + '18'}]}>
                  <Text style={{fontSize: 28}}>{project.icon}</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <View style={[styles.statusBadge, {backgroundColor: s.bg}]}>
                    <Text style={[styles.statusText, {color: s.color}]}>{s.label}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.projectDesc} numberOfLines={2}>{project.description}</Text>
              <View style={styles.progressRow}>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, {width: `${project.progress}%`, backgroundColor: project.color}]} />
                </View>
                <Text style={[styles.progressPct, {color: project.color}]}>{project.progress}%</Text>
              </View>
              <View style={styles.cardMeta}>
                <Text style={styles.metaText}>📅 {project.targetDate}</Text>
                <Text style={styles.metaText}>💰 {project.budget}</Text>
                <Text style={styles.metaText}>
                  ✅ {doneMilestones}/{project.milestones.length} tasks
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{height: 24}} />
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.backdrop}>
          <ScrollView contentContainerStyle={{justifyContent: 'flex-end'}}>
            <View style={styles.modal}>
              {selected && (() => {
                const s = statusConfig[selected.status];
                const spent = parseInt(selected.spent.replace(/[₹,]/g, '')) || 0;
                const budget = parseInt(selected.budget.replace(/[₹,]/g, '')) || 1;
                return (
                  <>
                    <View style={styles.modalHeader}>
                      <Text style={{fontSize: 36}}>{selected.icon}</Text>
                      <View style={styles.modalHeaderText}>
                        <Text style={styles.modalTitle}>{selected.title}</Text>
                        <View style={[styles.statusBadge, {backgroundColor: s.bg}]}>
                          <Text style={[styles.statusText, {color: s.color}]}>{s.label}</Text>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.modalDesc}>{selected.description}</Text>

                    {/* Progress */}
                    <View style={styles.progressCard}>
                      <View style={styles.progressRow}>
                        <Text style={styles.progressLabel}>Overall Progress</Text>
                        <Text style={[styles.progressPct, {color: selected.color}]}>
                          {selected.progress}%
                        </Text>
                      </View>
                      <View style={styles.progressBg}>
                        <View style={[styles.progressFill, {width: `${selected.progress}%`, backgroundColor: selected.color}]} />
                      </View>
                      {/* Budget bar */}
                      <View style={[styles.progressRow, {marginTop: 12}]}>
                        <Text style={styles.progressLabel}>Budget Used</Text>
                        <Text style={styles.progressPct}>
                          {selected.spent} / {selected.budget}
                        </Text>
                      </View>
                      <View style={styles.progressBg}>
                        <View style={[styles.progressFill, {width: `${Math.min((spent / budget) * 100, 100)}%`, backgroundColor: spent / budget > 0.8 ? '#EF4444' : '#27AE60'}]} />
                      </View>
                    </View>

                    {/* Details */}
                    <View style={styles.detailBox}>
                      {[
                        ['📅 Start', selected.startDate],
                        ['🎯 Target', selected.targetDate],
                        ['🔨 Contractor', selected.contractor],
                      ].map(([l, v]) => (
                        <View key={l} style={styles.detailRow}>
                          <Text style={styles.detailLabel}>{l}</Text>
                          <Text style={styles.detailValue}>{v}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Milestones */}
                    <Text style={styles.milestonesTitle}>Milestones</Text>
                    {selected.milestones.map((m, i) => (
                      <View key={i} style={styles.milestone}>
                        <View style={[styles.mCheck, m.done && {backgroundColor: selected.color, borderColor: selected.color}]}>
                          {m.done && <Text style={styles.mCheckText}>✓</Text>}
                        </View>
                        <Text style={[styles.mLabel, m.done && styles.mLabelDone]}>{m.label}</Text>
                      </View>
                    ))}

                    <TouchableOpacity
                      style={[styles.closeBtn, {backgroundColor: selected.color, marginTop: 20}]}
                      onPress={() => setSelected(null)}>
                      <Text style={styles.closeBtnText}>Close</Text>
                    </TouchableOpacity>
                  </>
                );
              })()}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#F5F0EB'},
  container: {flex: 1},
  content: {padding: 16},
  hero: {backgroundColor: '#E67E22', borderRadius: 16, padding: 20, marginBottom: 16},
  heroTitle: {fontSize: 20, fontWeight: '800', color: '#fff'},
  heroSub: {fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4, marginBottom: 16},
  heroStats: {flexDirection: 'row', gap: 8},
  heroStat: {flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 10, alignItems: 'center'},
  heroStatNum: {fontSize: 14, fontWeight: '800', color: '#fff'},
  heroStatLabel: {fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: 2, textAlign: 'center'},
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
  },
  cardTop: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  projectIcon: {width: 54, height: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12},
  cardInfo: {flex: 1},
  projectTitle: {fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 6},
  statusBadge: {borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start'},
  statusText: {fontSize: 11, fontWeight: '700'},
  projectDesc: {fontSize: 13, color: '#777', lineHeight: 18, marginBottom: 12},
  progressRow: {flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8},
  progressBg: {flex: 1, height: 6, backgroundColor: '#F0EBE3', borderRadius: 3, overflow: 'hidden'},
  progressFill: {height: '100%', borderRadius: 3},
  progressPct: {fontSize: 13, fontWeight: '700', minWidth: 36, textAlign: 'right'},
  cardMeta: {flexDirection: 'row', gap: 12, flexWrap: 'wrap'},
  metaText: {fontSize: 12, color: '#888'},
  // Modal
  backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end'},
  modal: {backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24},
  modalHeader: {flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12},
  modalHeaderText: {flex: 1},
  modalTitle: {fontSize: 20, fontWeight: '800', color: '#1A1A2E', marginBottom: 6},
  modalDesc: {fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 16},
  progressCard: {backgroundColor: '#F9F7F4', borderRadius: 12, padding: 14, marginBottom: 14},
  progressLabel: {flex: 1, fontSize: 13, color: '#666', fontWeight: '600'},
  detailBox: {backgroundColor: '#F9F7F4', borderRadius: 12, padding: 14, marginBottom: 16},
  detailRow: {flexDirection: 'row', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#F0EBE3'},
  detailLabel: {fontSize: 12, color: '#999', width: 110},
  detailValue: {flex: 1, fontSize: 13, fontWeight: '600', color: '#333'},
  milestonesTitle: {fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 10},
  milestone: {flexDirection: 'row', alignItems: 'center', marginBottom: 10},
  mCheck: {width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#ddd', alignItems: 'center', justifyContent: 'center', marginRight: 10},
  mCheckText: {color: '#fff', fontSize: 11, fontWeight: '800'},
  mLabel: {fontSize: 13, color: '#444', flex: 1},
  mLabelDone: {textDecorationLine: 'line-through', color: '#aaa'},
  closeBtn: {borderRadius: 12, paddingVertical: 14, alignItems: 'center'},
  closeBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
});

export default ProjectsScreen;
