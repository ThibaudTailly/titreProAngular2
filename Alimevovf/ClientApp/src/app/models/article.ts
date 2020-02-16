export class Article {
  id: string = ""
  title: string = "Defaulttitle"
  picture: string = ""
  body: string = "Defaultbody"
  creationDate: Date = new Date()
  lastModification: Date = new Date()
  fkCookUser: number = -1

}
