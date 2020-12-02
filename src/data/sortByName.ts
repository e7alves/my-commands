interface Sortable {
  name: string
}

export default (list: Sortable[]) => {
  list.sort((t1: Sortable, t2: Sortable) =>
    t1.name.toLowerCase() < t2.name.toLowerCase() ? -1 : 1,
  )
}
