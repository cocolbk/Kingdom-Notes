import React, {useMemo, useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../theme/colors';
import {radius, spacing} from '../theme/spacing';
import {typography} from '../theme/typography';
import {formatDisplayDate, todayISO} from '../utils/date';

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

function parseDate(value: string) {
  const fallback = new Date();
  if (!value) {
    return fallback;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function toISO(year: number, month: number, day: number) {
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

export function DatePickerField({
  label,
  value,
  onChange,
  required,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const initial = parseDate(value || todayISO());
  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth() + 1);
  const [day, setDay] = useState(initial.getDate());

  const years = useMemo(
    () => Array.from({length: 30}, (_, i) => new Date().getFullYear() - i),
    [],
  );
  const months = useMemo(
    () => Array.from({length: 12}, (_, i) => i + 1),
    [],
  );
  const days = useMemo(() => {
    const max = new Date(year, month, 0).getDate();
    return Array.from({length: max}, (_, i) => i + 1);
  }, [year, month]);

  const openPicker = () => {
    const parsed = parseDate(value || todayISO());
    setYear(parsed.getFullYear());
    setMonth(parsed.getMonth() + 1);
    setDay(parsed.getDate());
    setOpen(true);
  };

  const confirm = () => {
    const maxDay = new Date(year, month, 0).getDate();
    const safeDay = Math.min(day, maxDay);
    onChange(toISO(year, month, safeDay));
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <TouchableOpacity style={styles.input} onPress={openPicker}>
        <Text style={styles.inputText}>
          {value ? formatDisplayDate(value) : 'Select date'}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={e => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Select Date</Text>
            <View style={styles.columns}>
              <PickerColumn
                label="Month"
                items={months}
                selected={month}
                onSelect={setMonth}
                format={m =>
                  new Date(2000, m - 1, 1).toLocaleString(undefined, {
                    month: 'short',
                  })
                }
              />
              <PickerColumn
                label="Day"
                items={days}
                selected={day}
                onSelect={setDay}
              />
              <PickerColumn
                label="Year"
                items={years}
                selected={year}
                onSelect={setYear}
              />
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setOpen(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.doneButton} onPress={confirm}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function PickerColumn<T extends number>({
  label,
  items,
  selected,
  onSelect,
  format,
}: {
  label: string;
  items: T[];
  selected: T;
  onSelect: (value: T) => void;
  format?: (value: T) => string;
}) {
  return (
    <View style={styles.column}>
      <Text style={styles.columnLabel}>{label}</Text>
      <ScrollView style={styles.columnScroll} showsVerticalScrollIndicator={false}>
        {items.map(item => {
          const active = item === selected;
          return (
            <TouchableOpacity
              key={String(item)}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => onSelect(item)}>
              <Text style={[styles.optionText, active && styles.optionTextActive]}>
                {format ? format(item) : String(item)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  required: {
    color: colors.accent,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    ...typography.body,
    color: colors.text,
  },
  calendarIcon: {
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    maxHeight: '70%',
  },
  sheetTitle: {
    ...typography.h2,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  columns: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  column: {
    flex: 1,
  },
  columnLabel: {
    ...typography.caption,
    textAlign: 'center',
    marginBottom: spacing.sm,
    color: colors.textMuted,
  },
  columnScroll: {
    maxHeight: 220,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
  },
  option: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  optionActive: {
    backgroundColor: colors.primary,
  },
  optionText: {
    ...typography.bodySmall,
    color: colors.text,
  },
  optionTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  cancelText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  doneButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  doneText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '700',
  },
});
