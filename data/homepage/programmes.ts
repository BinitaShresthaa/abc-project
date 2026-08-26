export interface Programme {
  id: string; name: string; fullName: string; faculty: string; duration: string; focus: string;
  level: "Bachelor's" | "Master's"; href: string;
}

export const bachelorProgrammes: Programme[] = [
  { id:"ba", name:"B.A.", fullName:"Bachelor of Arts", faculty:"Humanities & Social Sciences", duration:"4 Years", focus:"Humanities & social sciences", level:"Bachelor's", href:"/#programmes" },
  { id:"bba", name:"BBA", fullName:"Bachelor of Business Administration", faculty:"Management", duration:"4 Years", focus:"Business & management", level:"Bachelor's", href:"/#programmes" },
  { id:"bbs", name:"B.B.S.", fullName:"Bachelor of Business Studies", faculty:"Management", duration:"4 Years", focus:"Business studies & commerce", level:"Bachelor's", href:"/#programmes" },
  { id:"bed-english", name:"B.Ed. English", fullName:"Bachelor of Education in English", faculty:"Education", duration:"4 Years", focus:"English education & pedagogy", level:"Bachelor's", href:"/#programmes" },
  { id:"bed-math", name:"B.Ed. Math", fullName:"Bachelor of Education in Mathematics", faculty:"Education", duration:"4 Years", focus:"Mathematics education", level:"Bachelor's", href:"/#programmes" },
  { id:"bed-nepali", name:"B.Ed. Nepali", fullName:"Bachelor of Education in Nepali", faculty:"Education", duration:"4 Years", focus:"Nepali language & literature", level:"Bachelor's", href:"/#programmes" },
  { id:"bed-science", name:"B.Ed. Science", fullName:"Bachelor of Education in Science", faculty:"Education", duration:"4 Years", focus:"Science education & STEM", level:"Bachelor's", href:"/#programmes" },
  { id:"bict-ed", name:"BICTE", fullName:"Bachelor of Information & Communication Technology Education", faculty:"Education / ICT", duration:"4 Years", focus:"ICT, programming & pedagogy", level:"Bachelor's", href:"/#programmes" },
];

export const masterProgrammes: Programme[] = [
  { id:"ma", name:"M.A.", fullName:"Master of Arts", faculty:"Humanities & Social Sciences", duration:"2 Years", focus:"Advanced humanities & social sciences", level:"Master's", href:"/#programmes" },
  { id:"mbs", name:"M.B.S.", fullName:"Master of Business Studies", faculty:"Management", duration:"2 Years", focus:"Advanced business studies", level:"Master's", href:"/#programmes" },
  { id:"med", name:"M.Ed.", fullName:"Master of Education", faculty:"Education", duration:"2 Years", focus:"Education, English, Nepali & EPM", level:"Master's", href:"/#programmes" },
];

export const allProgrammes = [...bachelorProgrammes, ...masterProgrammes].map(({id, name, href}) => ({id, name, href}));
