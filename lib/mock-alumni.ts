export interface Alumni {
  id: string;
  regNo: string;
  photo?: string;
  name: string;
  email: string;
  contact: string;
  currentJob: string;
  faculty: string;
  batch: string;
  passoutYear: string;
}

export const mockAlumni: Alumni[] = [
  { id: "1", regNo: "REG-2018-014", name: "Sunita Adhikari", email: "sunita.a@example.com", contact: "+977-9841000011", currentJob: "Software Engineer, LOC", faculty: "BICTE", batch: "2018", passoutYear: "2022" },
  { id: "2", regNo: "REG-2017-092", name: "Rajesh Thapa", email: "rajesh.t@example.com", contact: "+977-9851000022", currentJob: "Bank Officer, NIC Asia", faculty: "BBA", batch: "2017", passoutYear: "2021" },
  { id: "3", regNo: "REG-2019-051", name: "Priya Gurung", email: "priya.g@example.com", contact: "+977-9861000033", currentJob: "Teacher, Mount Valley School", faculty: "BA English", batch: "2019", passoutYear: "2023" },
  { id: "4", regNo: "REG-2016-007", name: "Bikash Shrestha", email: "bikash.s@example.com", contact: "+977-9871000044", currentJob: "Accountant, Himal Traders", faculty: "BBS", batch: "2016", passoutYear: "2020" },
  { id: "5", regNo: "REG-2018-063", name: "Anita Karki", email: "anita.k@example.com", contact: "+977-9881000055", currentJob: "Journalist, Kantipur", faculty: "BA Nepali", batch: "2018", passoutYear: "2022" },
    { id: "6", regNo: "REG-2019-029", name: "Dipesh Rana", email: "dipesh.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },
  { id: "7", regNo: "REG-2019-024", name: "hruo Rana", email: "dsf.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },
  { id: "8", regNo: "REG-2019-078", name: "Dipdfgesh Rana", email: "sfa.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },
  { id: "9", regNo: "REG-2019-003", name: "hsrg Rana", email: "wtsf.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },
  { id: "10", regNo: "REG-2019-028", name: "gdsg Rana", email: "sgvv.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },
  { id: "11", regNo: "REG-2019-056", name: "gsdg Rana", email: "svsdfvssz.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },

  { id: "12", regNo: "REG-2019-087", name: "yukt Rana", email: "zvzsf.r@example.com", contact: "+977-9891000066", currentJob: "Civil Engineer, DUDBC", faculty: "B.Ed Science", batch: "2019", passoutYear: "2023" },
];