var structures = {
  loaded: []
}
structures.index = fs.readdirSync(fileSystem.root+"engine/structures")

for (var i=0; i<structures.index.length; i++){
  LoadJS("engine/structures/"+structures.index[i], false, false)
  structures.loaded.push(structures.index[i])
}
