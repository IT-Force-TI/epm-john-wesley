// ============================================================================
//  PROFIL DE L'ÉTABLISSEMENT
//  C'est le fichier à adapter pour décliner le site pour une autre école :
//  identité, coordonnées, tarifs par défaut, textes de l'accueil, cycles, FAQ…
//  Les images référencées se trouvent dans le dossier public/.
//
//  En mode API, les coordonnées et les tarifs (bloc `settings`) sont ensuite
//  remplacés par ceux enregistrés dans l'administration (GET /api/public/settings).
// ============================================================================
import type { Settings } from '../models'

export interface CycleProfile {
  /**
   * Valeur technique du cycle. Doit correspondre aux cycles acceptés par le backend
   * (utils/schemas.js) : Maternelle / Primaire / Collège. N'est pas affichée telle quelle.
   */
  name: string
  /** Libellé affiché sur le site (ex. « Préscolaire » pour la valeur technique « Maternelle »). */
  label: string
  /** Segment d'URL de la page d'admission : /admissions/<slug>. */
  slug: string
  age: string
  text: string
  /** Classes proposées. Doivent correspondre aux classes acceptées par le backend. */
  classes: string[]
  skills: string[]
  programs: { icon: string; title: string; text: string }[]
}

export interface SchoolProfile {
  /** Identifiant technique (sert aussi de clé de stockage des fake data). */
  id: string
  logo: string
  /** Valeurs par défaut des paramètres (affichées avant chargement et utilisées par les fake data). */
  settings: Settings
  footerText: string
  hero: { eyebrow: string; titleLines: string[]; highlight: string; intro: string; images: string[] }
  founder: {
    photo: string
    photoAlt: string
    eyebrow: string
    titleLines: string[]
    greeting: string
    paragraphs: string[]
    signature: string
  }
  history: { title: string; paragraphs: string[]; stats: { value: string; label: string }[] }
  values: { icon: string; title: string; text: string }[]
  faq: { q: string; a: string; link?: { to: string; label: string } }[]
  cycles: CycleProfile[]
  admissions: { documents: string[] }
}

// ----------------------------------------------------------------------------
//  EPM JOHN WESLEY — Djagblé (préfecture du Zio, Région Maritime)
//  École confessionnelle protestante méthodiste, sous la tutelle de la Direction Nationale
//  des Écoles Protestantes Méthodistes du Togo (EPMT), agréée par l'État.
//  Cycles : Préscolaire (jardin d'enfants) et Primaire (CEPE).
//  Données vérifiées : nom, statut, téléphone, localité, cycles et classes, CEPE.
//  Données FICTIVES à confirmer : slogan, e-mail, horaires, tarifs, effectifs, textes de
//  présentation, nom du directeur, activités spirituelles proposées.
// ----------------------------------------------------------------------------
export const school: SchoolProfile = {
  id: 'epm-john-wesley-djagble',
  logo: '/john-wesley-logo.png',
  settings: {
    name: 'École Protestante Méthodiste John Wesley',
    shortName: 'EPM John Wesley',
    slogan: 'FOI, DISCIPLINE ET EXCELLENCE',
    address: 'Djagblé, préfecture du Zio — Région Maritime, Togo',
    email: 'contact@epm-johnwesley-djagble.tg',
    phone: '+228 90 07 71 89',
    phone2: '',
    hours: 'Lundi – Vendredi : 7h00 – 17h00',
    annualFee: 60000,
    canteenFee: 300,
    badgeFee: 1000,
    uniformFee: 4000,
    apeFee: 2000,
  },
  footerText:
    'École chrétienne protestante méthodiste de Djagblé, sous la tutelle de l’EPMT et agréée par l’État : du jardin d’enfants au CM2, nous formons des enfants instruits, droits et pleins d’amour pour leur prochain.',
  hero: {
    eyebrow: 'FOI - DISCIPLINE - EXCELLENCE',
    titleLines: ['École Protestante', 'Méthodiste'],
    highlight: 'John Wesley',
    intro:
      'Bienvenue à l’EPM John Wesley de Djagblé. Notre école chrétienne unit la foi, la rigueur morale, l’amour du prochain et l’excellence académique, du jardin d’enfants jusqu’au CEPE.',
    images: ['/hero/hero-1.jpg', '/hero/hero-2.jpg', '/hero/hero-3.jpg'],
  },
  founder: {
    photo: '/directeur-general.jpg',
    photoAlt: 'Le directeur de l’EPM John Wesley de Djagblé',
    eyebrow: 'UN MOT DU DIRECTEUR',
    titleLines: ['Instruire l’esprit,', 'former le cœur.'],
    greeting: 'Chers parents, chers élèves,',
    paragraphs: [
      'Notre école porte le nom de John Wesley, fondateur du méthodisme, qui voulait unir une foi vivante, une vie disciplinée et le service des autres. C’est cet héritage que nous transmettons chaque jour à vos enfants.',
      'À l’EPM John Wesley, nous visons l’excellence dans les apprentissages, tout en formant des enfants honnêtes, respectueux et attentifs aux autres. Bienvenue dans une école où chaque enfant est accueilli et accompagné avec amour et exigence.',
    ],
    signature: 'Le Directeur',
  },
  history: {
    title: 'Notre Histoire',
    paragraphs: [
      'L’École Protestante Méthodiste John Wesley est implantée à Djagblé, dans la préfecture du Zio, une banlieue en très forte expansion au nord-est de Lomé. Elle répond aux besoins éducatifs des familles de Djagblé et de ses environs.',
      'L’école fait partie du réseau des Écoles Protestantes Méthodistes du Togo. Elle est placée sous la tutelle de la Direction Nationale des Écoles Protestantes Méthodistes du Togo (EPMT) et agréée par l’État ; elle suit les programmes officiels de l’enseignement général.',
      'Elle porte le nom de John Wesley (1703-1791), pasteur anglais fondateur du mouvement méthodiste, connu pour son attachement à l’instruction, à une foi vécue au quotidien et à l’amour du prochain.',
    ],
    stats: [
      { value: '2', label: 'Cycles : préscolaire et primaire' },
      { value: '9', label: 'Niveaux, de la petite section au CM2' },
      { value: '100%', label: 'Engagement pour la réussite au CEPE' },
    ],
  },
  values: [
    {
      icon: 'heart',
      title: 'Foi et amour du prochain',
      text: 'Une éducation chrétienne qui apprend à aimer, partager et servir.',
    },
    {
      icon: 'shield',
      title: 'Discipline et rigueur morale',
      text: 'Honnêteté, respect, ponctualité et sens des responsabilités.',
    },
    {
      icon: 'graduation',
      title: 'Excellence académique',
      text: 'Des apprentissages solides et une préparation sérieuse au CEPE.',
    },
    {
      icon: 'users',
      title: 'Communauté',
      text: 'Parents, enseignants, élèves et Église unis autour de chaque enfant.',
    },
  ],
  faq: [
    {
      q: 'Où se trouve l’école ?',
      a: 'À Djagblé, dans la préfecture du Zio, au nord-est de Lomé. Appelez-nous ou écrivez-nous sur WhatsApp au +228 90 07 71 89 pour être guidé.',
    },
    {
      q: 'Qui gère l’école ?',
      a: 'L’EPM John Wesley est une école confessionnelle protestante méthodiste, placée sous la tutelle de la Direction Nationale des Écoles Protestantes Méthodistes du Togo (EPMT) et agréée par l’État togolais.',
    },
    {
      q: 'Faut-il être méthodiste pour inscrire son enfant ?',
      a: 'L’école accueille les familles qui adhèrent à son projet éducatif chrétien et à son règlement intérieur. Le secrétariat vous présentera la vie spirituelle de l’école lors de votre visite.',
    },
    {
      q: 'Quels cycles proposez-vous ?',
      a: 'Le préscolaire, ou jardin d’enfants (petite, moyenne et grande section), et le primaire (du CP1 au CM2), avec préparation et présentation au CEPE.',
      link: { to: '/cycles', label: 'Voir nos cycles' },
    },
    {
      q: 'Quelles activités spirituelles proposez-vous ?',
      a: 'En plus du programme officiel togolais, la semaine est rythmée par un culte d’ouverture, des partages bibliques adaptés à l’âge des enfants et des activités de jeunesse chrétienne.',
    },
    {
      q: 'À combien s’élèvent les frais de scolarité ?',
      a: 'La scolarité annuelle et les frais annexes sont détaillés sur la page Tarifs et scolarité. Le paiement peut se faire en trois tranches.',
      link: { to: '/tarifs', label: 'Voir les tarifs' },
    },
  ],
  cycles: [
    {
      name: 'Maternelle',
      label: 'Préscolaire',
      slug: 'prescolaire',
      age: '3 à 6 ans',
      text: 'Le cycle préscolaire (jardin d’enfants) est la première étape du parcours scolaire. Dans un cadre chrétien, chaleureux et sécurisant, l’enfant s’éveille, chante, découvre la vie en groupe et prépare son entrée au CP1.',
      classes: ['Petite section', 'Moyenne section', 'Grande section'],
      skills: [
        'Éveil, motricité et expression corporelle',
        'Développement du langage',
        'Socialisation et vie en groupe',
        'Premières découvertes des lettres et des nombres',
      ],
      programs: [
        {
          icon: 'heart',
          title: 'Chants et prières',
          text: 'Chants, comptines et courtes prières pour bien commencer la journée.',
        },
        {
          icon: 'idea',
          title: 'Éveil et créativité',
          text: 'Dessin, peinture, activités manuelles et jeux éducatifs.',
        },
        {
          icon: 'users',
          title: 'Socialisation',
          text: 'Apprendre à partager, à attendre son tour et à respecter les autres.',
        },
      ],
    },
    {
      name: 'Primaire',
      label: 'Primaire',
      slug: 'primaire',
      age: '6 à 12 ans',
      text: 'Le primaire consolide les apprentissages fondamentaux, du CP1 au CM2, selon le programme officiel togolais. Les élèves sont préparés et présentés à l’examen officiel du CEPE (Certificat d’Études du Premier Cycle), qui ouvre l’entrée en 6e.',
      classes: ['CP1', 'CP2', 'CE1', 'CE2', 'CM1', 'CM2'],
      skills: [
        'Lecture, écriture et expression orale',
        'Mathématiques et raisonnement logique',
        'Sciences, histoire-géographie et éducation civique et morale',
        'Préparation au CEPE en classe de CM2',
      ],
      programs: [
        {
          icon: 'book',
          title: 'Savoirs fondamentaux',
          text: 'Lecture, écriture et calcul au quotidien.',
        },
        {
          icon: 'heart',
          title: 'Vie spirituelle',
          text: 'Culte d’ouverture, partages bibliques et jeunesse chrétienne.',
        },
        {
          icon: 'graduation',
          title: 'Objectif CEPE',
          text: 'Révisions, devoirs et examens blancs en CM2.',
        },
      ],
    },
  ],
  admissions: {
    documents: [
      'Un (1) extrait d’acte de naissance',
      'Les bulletins de l’année précédente (sauf entrée en petite section)',
      'Un certificat de scolarité ou de transfert (pour un élève venant d’une autre école)',
      'Deux (2) photos d’identité récentes',
      'Un (1) carnet de santé ou de vaccination',
    ],
  },
}

/** Classes par cycle, dérivées du profil (formulaires, filtres, fake data). */
export const classesByCycle: Record<string, string[]> = Object.fromEntries(
  school.cycles.map((c) => [c.name, c.classes]),
)

/** Libellé affiché d'un cycle à partir de sa valeur technique (ex. « Maternelle » → « Préscolaire »). */
export const cycleLabel = (name: string): string =>
  school.cycles.find((c) => c.name === name)?.label ?? name
