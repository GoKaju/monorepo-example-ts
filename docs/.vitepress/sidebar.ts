import fs from 'fs'
import path from 'path'

export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

const docsRoot = path.resolve(__dirname, '../src')

function getSidebar(dir: string, baseUrl = ''): SidebarItem[] {
  const fullDir = path.join(docsRoot, dir)
  const files = fs.readdirSync(fullDir)
  const exclude = ['.vitepress', 'node_modules', 'assets']
  // Filter out excluded directories and files
  const filteredFiles = files.filter((file) => !exclude.includes(file))

  const items: SidebarItem[] = filteredFiles
    .map((file): SidebarItem | undefined => {
      const fullPath = path.join(fullDir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        return {
          text: capitalize(file),
          collapsed: true,
          items: getSidebar(path.join(dir, file), `${baseUrl}/${file}`),
        }
      } else if (file.endsWith('.md') && file.toLowerCase() !== 'index.md') {
        const name = file.replace(/\.md$/, '')
        const filePath = path.join(fullDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        let title = capitalize(name)

        // Extraer el título del frontmatter si existe
        const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/)
        if (frontmatterMatch) {
          const frontmatter = frontmatterMatch[1]
          const titleMatch = frontmatter.match(/title:\s*["']?(.+?)["']?$/m)
          if (titleMatch) {
            title = titleMatch[1]
          }
        }

        return {
          text: title,
          link: `${baseUrl}/${name}`,
        }
      }
      return undefined
    })
    .filter((item): item is SidebarItem => Boolean(item))

  return items
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function buildSidebar(): SidebarItem[] {
  return [
    {
      text: 'Documentación',
      collapsed: false,
      items: getSidebar('.'),
    },
  ]
}
