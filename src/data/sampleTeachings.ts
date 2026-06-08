import {Teaching} from '../types/teaching';

export const SAMPLE_TEACHINGS: Teaching[] = [
  {
    id: 'sample-1',
    title: 'Walking in Faith',
    pastorName: 'Pastor David Mensah',
    date: '2026-06-01',
    scriptureReference: 'Hebrews 11:1, Romans 10:17',
    mainTeachingNotes:
      'Faith is the substance of things hoped for. We must guard what we hear, speak faith-filled words, and act on the Word daily. Every challenge is an opportunity to trust God more deeply.',
    prayer:
      'Lord, increase my faith. Help me to trust You in every season and walk boldly in Your promises.',
    confession:
      'I walk by faith and not by sight. My faith grows stronger every day through the Word of God.',
    isFavorite: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 'sample-2',
    title: 'The Power of Prayer',
    pastorName: 'Pastor Grace Adjei',
    date: '2026-05-25',
    scriptureReference: 'James 5:16, Matthew 6:6',
    mainTeachingNotes:
      'Prayer is communion with God, not a religious ritual. The effectual fervent prayer of the righteous availeth much. Build a consistent prayer life in secret and watch God move openly.',
    prayer:
      'Father, teach me to pray with faith and persistence. Let my prayer life draw me closer to You.',
    confession:
      'My prayers are powerful and effective. God hears me when I pray according to His will.',
    isFavorite: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
  {
    id: 'sample-3',
    title: 'Living in Victory',
    pastorName: 'Pastor Samuel Osei',
    date: '2026-05-18',
    scriptureReference: '1 Corinthians 15:57, Romans 8:37',
    mainTeachingNotes:
      'Victory is not something we pursue — it is something we receive through Christ. We are more than conquerors. Declare victory over every area of your life and refuse to live beneath your privileges in Christ.',
    prayer:
      'Thank You Jesus for the victory. I receive grace to live as an overcomer in every situation.',
    confession:
      'I am victorious through Christ Jesus. No weapon formed against me shall prosper.',
    isFavorite: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 21,
  },
];
