export class Article {
  id: string = ""
  title: string = "Inserer un titre"
  abstract = "Le résume de l'article"
  picture: string = ""
  body: string = "Defaultbody"
  creationDate: Date = new Date()
  lastModification: Date = new Date()
  fkCookUser: number = -1

}
