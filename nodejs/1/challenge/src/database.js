import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url)

export class Database{
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search){
    let data = this.#database[table] ?? []

    if(search){
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value)
        })
      })
    }
    
    return data

  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    }else{
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }

  update(table, id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    const databaseData = this.#database[table] ?? []
    const database = databaseData.filter(data => id === data.id)
    
    const {created_at, completed_at} = database[0]
   
    if(rowIndex > -1){
      this.#database[table][rowIndex] = { id, created_at, completed_at, ...data }
      this.#persist()
    }
  }

  updateComplete(table, id, data){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    const databaseData = this.#database[table] ?? []
    const database = databaseData.filter(data => id === data.id)
    
    const {created_at, title, description,} = database[0]
   
    if(rowIndex > -1){
      this.#database[table][rowIndex] = { id, title, description, created_at, ...data }
      this.#persist()
    }
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
  
    if(rowIndex > -1){
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}