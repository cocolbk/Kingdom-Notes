import { Teaching } from '../types/teaching'

export const SAMPLE_TEACHINGS: Teaching[] = [
  {
    id: '1',
    title: 'The Power of Prayer',
    pastorName: 'Pastor James',
    date: '2024-01-15',
    scriptureReference: 'Matthew 6:5-15',
    mainTeachingNotes:
      'Prayer is not just asking God for things, but rather a conversation with God. We must pray with faith and believe that God will answer. Jesus taught us to pray the Lord\'s Prayer as a model. Prayer should be sincere, specific, and come from a repentant heart.',
    prayer:
      'Lord, help us to pray without ceasing and to trust in Your perfect will for our lives. Give us wisdom and discernment to seek Your kingdom first.',
    confession:
      'I confess that I have not always made prayer a priority in my daily life. I have relied on my own strength instead of seeking Your guidance.',
    isFavorite: true,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    title: 'Understanding God\'s Grace',
    pastorName: 'Pastor Sarah',
    date: '2024-01-22',
    scriptureReference: 'Ephesians 2:8-9',
    mainTeachingNotes:
      'Grace is God\'s unmerited favor toward us. We cannot earn it through works, but only receive it through faith in Jesus Christ. God\'s grace is sufficient for all our needs and is renewed each morning. Living in grace means extending that same grace to others.',
    prayer:
      'Father, thank You for Your endless grace and mercy. Help us to live worthy of the grace You have shown us and to share it with those around us.',
    confession:
      'I confess that I have taken Your grace for granted and have not always lived in a way that reflects Your love and mercy.',
    isFavorite: false,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    title: 'Building a Strong Foundation in Christ',
    pastorName: 'Pastor Michael',
    date: '2024-01-29',
    scriptureReference: 'Matthew 7:24-27',
    mainTeachingNotes:
      'Just as a house needs a strong foundation to withstand storms, our faith must be built on the solid rock of Jesus Christ. We build this foundation through reading God\'s Word, prayer, fellowship, and obedience. When we build on Christ, nothing can shake our faith.',
    prayer:
      'Jesus, be the foundation of our lives. Strengthen our faith and help us to stand firm in You through all circumstances.',
    confession:
      'I confess that at times I have built my life on worldly values instead of placing Christ at the center. Help me to realign my priorities.',
    isFavorite: true,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
]