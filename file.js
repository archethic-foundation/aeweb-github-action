import fs from "fs"
import path from "path"
import glob from "glob"
import parse from "parse-gitignore"

export function normalizeFolderPath(folderPath) {
  return path.normalize(folderPath.endsWith(path.sep) ? folderPath.slice(0, -1) : folderPath)
}

export function getFolderFiles(folderPath, includeGitIgnoredFiles = false) {
  let files = []
  const filters = []
  if (fs.statSync(folderPath).isDirectory()) {
    handleDirectory(folderPath, files, includeGitIgnoredFiles, filters)

    files = files.map((file) => {
      file.filePath = file.filePath.replace(folderPath, '')
      return file
    })
  } else {
   const data = fs.readFileSync(folderPath)
   const filePath = path.basename(folderPath)
   files.push({ filePath, data })
  }

  return files
}

function handleDirectory(folderPath, files, includeGitIgnoredFiles, filters) {
  if (!includeGitIgnoredFiles) {
    filters = getFilters(folderPath, filters)
  }

  // Check if files is filtered
  if (!filters.includes(folderPath)) {
    // reduce search space by omitting folders at once
    if (fs.statSync(folderPath).isDirectory()) {
      fs.readdirSync(folderPath).forEach((child) => {
        handleDirectory(folderPath + path.sep + child, files, includeGitIgnoredFiles, filters)
      })
    } else {
      handleFile(folderPath, files);
    }
  }
}

function handleFile(filePath, files) {
    const data = fs.readFileSync(filePath)
    files.push({ filePath, data })
}

function getFilters(folderPath, filters) {
  let newFilters = []

  const gitIgnoreFilePath = path.join(folderPath, '.gitignore')
  if (fs.existsSync(gitIgnoreFilePath)) {
    console.log('Ignore files from: ' + gitIgnoreFilePath)
    newFilters = parse(fs.readFileSync(gitIgnoreFilePath))['patterns']
    newFilters.unshift('.gitignore')
    newFilters.unshift('.git')
  }

  // Add the new filters to the previous filters
  return newFilters.reduce((acc, filePath) => {
    return acc.concat(glob.sync(path.join(folderPath, filePath)))
  }, filters)
}
