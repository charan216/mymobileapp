import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';

type Document = {
  id: string;
  title: string;
  category: string;
  icon: string;
  color: string;
  status: 'valid' | 'expiring' | 'expired';
  expiry: string;
  fileSize: string;
  addedOn: string;
  notes: string;
};

const DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Lease Agreement',
    category: 'Legal',
    icon: '📜',
    color: '#4F6EF7',
    status: 'valid',
    expiry: 'Dec 2026',
    fileSize: '1.2 MB',
    addedOn: '1 Jan 2025',
    notes: 'Signed 2-year lease with Mr. Raghavendra. Rent: ₹22,000/month. Deposit: ₹66,000.',
  },
  {
    id: '2',
    title: 'Home Insurance',
    category: 'Insurance',
    icon: '🛡️',
    color: '#27AE60',
    status: 'valid',
    expiry: 'Mar 2027',
    fileSize: '890 KB',
    addedOn: '15 Mar 2025',
    notes: 'HDFC ERGO policy. Covers fire, flood, theft. Premium: ₹8,500/year.',
  },
  {
    id: '3',
    title: 'Property Tax Receipt',
    category: 'Tax',
    icon: '🏛️',
    color: '#8B5CF6',
    status: 'valid',
    expiry: 'Mar 2027',
    fileSize: '450 KB',
    addedOn: '10 Apr 2025',
    notes: 'FY 2025-26 property tax paid. Amount: ₹14,200. Receipt no: GHMC-2025-00234.',
  },
  {
    id: '4',
    title: 'Society Maintenance',
    category: 'Utility',
    icon: '🏢',
    color: '#F59E0B',
    status: 'expiring',
    expiry: 'Apr 2026',
    fileSize: '320 KB',
    addedOn: '1 Apr 2025',
    notes: 'Monthly maintenance: ₹3,500. Covers security, lift, water, common area cleaning.',
  },
  {
    id: '5',
    title: 'Samsung Refrigerator Warranty',
    category: 'Warranty',
    icon: '📋',
    color: '#EC4899',
    status: 'valid',
    expiry: 'Aug 2027',
    fileSize: '210 KB',
    addedOn: '20 Aug 2022',
    notes: 'Model: RT42T5C58S8. 5-year compressor warranty. Service centre: 1800-40-7267464.',
  },
  {
    id: '6',
    title: 'NOC from Owner',
    category: 'Legal',
    icon: '✍️',
    color: '#06B6D4',
    status: 'valid',
    expiry: 'Dec 2026',
    fileSize: '180 KB',
    addedOn: '1 Jan 2025',
    notes: 'No Objection Certificate for modifications (painting, fixtures). Notarized.',
  },
  {
    id: '7',
    title: 'Internet Service Agreement',
    category: 'Utility',
    icon: '🌐',
    color: '#10B981',
    status: 'valid',
    expiry: 'Dec 2026',
    fileSize: '290 KB',
    addedOn: '5 Jan 2025',
    notes: 'ACT Fibernet 300 Mbps plan. ₹799/month. Account: 9988776655.',
  },
  {
    id: '8',
    title: 'Electricity Bill (Mar 2026)',
    category: 'Utility',
    icon: '⚡',
    color: '#EF4444',
    status: 'expiring',
    expiry: 'Apr 2026',
    fileSize: '95 KB',
    addedOn: '1 Mar 2026',
    notes: 'Units consumed: 248. Amount: ₹2,108. Consumer No: 1045678. TSSPDCL.',
  },
];

const statusColor = {valid: '#27AE60', expiring: '#F59E0B', expired: '#EF4444'};
const statusLabel = {valid: 'Valid', expiring: 'Expiring Soon', expired: 'Expired'};

const DocumentsScreen = () => {
  const [selected, setSelected] = useState<Document | null>(null);

  const byCategory = DOCUMENTS.reduce<Record<string, Document[]>>((acc, doc) => {
    acc[doc.category] = acc[doc.category] ? [...acc[doc.category], doc] : [doc];
    return acc;
  }, {});

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>📄 Documents</Text>
          <Text style={styles.heroSub}>All your important home files in one place</Text>
          <View style={styles.heroStats}>
            <Text style={styles.heroStat}>📁 {DOCUMENTS.length} files</Text>
            <Text style={styles.heroStat}>
              ⚠️ {DOCUMENTS.filter(d => d.status === 'expiring').length} expiring
            </Text>
          </View>
        </View>

        {Object.entries(byCategory).map(([category, docs]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {docs.map(doc => (
              <TouchableOpacity
                key={doc.id}
                style={styles.docCard}
                onPress={() => setSelected(doc)}
                activeOpacity={0.8}>
                <View style={[styles.docIcon, {backgroundColor: doc.color + '18'}]}>
                  <Text style={{fontSize: 22}}>{doc.icon}</Text>
                </View>
                <View style={styles.docInfo}>
                  <Text style={styles.docTitle}>{doc.title}</Text>
                  <Text style={styles.docMeta}>
                    Expires: {doc.expiry} · {doc.fileSize}
                  </Text>
                </View>
                <View style={[styles.statusBadge, {backgroundColor: statusColor[doc.status] + '22'}]}>
                  <Text style={[styles.statusText, {color: statusColor[doc.status]}]}>
                    {statusLabel[doc.status]}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <View style={{height: 20}} />
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <View style={[styles.modalIcon, {backgroundColor: selected.color + '22'}]}>
                  <Text style={{fontSize: 36}}>{selected.icon}</Text>
                </View>
                <Text style={styles.modalTitle}>{selected.title}</Text>
                <Text style={[styles.modalCategory, {color: selected.color}]}>
                  {selected.category}
                </Text>
                <View style={styles.modalRows}>
                  {[
                    ['📅 Expiry', selected.expiry],
                    ['🗓 Added On', selected.addedOn],
                    ['💾 File Size', selected.fileSize],
                    ['📌 Status', statusLabel[selected.status]],
                  ].map(([label, val]) => (
                    <View key={label} style={styles.modalRow}>
                      <Text style={styles.modalLabel}>{label}</Text>
                      <Text style={styles.modalValue}>{val}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.modalNoteBox}>
                  <Text style={styles.modalNoteLabel}>📝 Notes</Text>
                  <Text style={styles.modalNote}>{selected.notes}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.closeBtn, {backgroundColor: selected.color}]}
                  onPress={() => setSelected(null)}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#F5F0EB'},
  container: {flex: 1},
  content: {padding: 16},
  hero: {
    backgroundColor: '#27AE60',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {fontSize: 20, fontWeight: '800', color: '#fff'},
  heroSub: {fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4},
  heroStats: {flexDirection: 'row', gap: 16, marginTop: 12},
  heroStat: {color: '#fff', fontSize: 13, fontWeight: '600', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20},
  section: {marginBottom: 16},
  categoryTitle: {fontSize: 13, fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8, marginLeft: 4},
  docCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  docIcon: {width: 46, height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12},
  docInfo: {flex: 1},
  docTitle: {fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 3},
  docMeta: {fontSize: 12, color: '#999'},
  statusBadge: {borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3},
  statusText: {fontSize: 10, fontWeight: '700'},
  // Modal
  modalBackdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'},
  modalCard: {backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 28, alignItems: 'center'},
  modalIcon: {width: 72, height: 72, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 12},
  modalTitle: {fontSize: 20, fontWeight: '800', color: '#1A1A2E', textAlign: 'center'},
  modalCategory: {fontSize: 14, fontWeight: '600', marginTop: 4, marginBottom: 16},
  modalRows: {width: '100%', backgroundColor: '#F9F7F4', borderRadius: 12, padding: 14, marginBottom: 14},
  modalRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#F0EBE3'},
  modalLabel: {fontSize: 13, color: '#999'},
  modalValue: {fontSize: 13, fontWeight: '600', color: '#333'},
  modalNoteBox: {width: '100%', backgroundColor: '#FFF8F0', borderRadius: 10, padding: 14, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: '#FF6B35'},
  modalNoteLabel: {fontSize: 12, fontWeight: '700', color: '#FF6B35', marginBottom: 6},
  modalNote: {fontSize: 13, color: '#555', lineHeight: 19},
  closeBtn: {width: '100%', borderRadius: 12, paddingVertical: 14, alignItems: 'center'},
  closeBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
});

export default DocumentsScreen;
