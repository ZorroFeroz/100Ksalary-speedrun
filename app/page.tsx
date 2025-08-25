"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Terminal, Mail, MessageCircle, Linkedin, MapPin, Building, Code, Globe, Sun, Moon } from "lucide-react"

interface CVData {
  personalInfo: {
    name: string
    title: string
    email: string
    phone: string
    linkedin: string
    location: string
  }
  summary: string
  experience: Array<{
    title: string
    company: string
    period: string
    responsibilities: string[]
  }>
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  certifications: string[]
  technicalSkills: string[]
  softSkills: string[]
  languages: Array<{
    language: string
    level: string
  }>
}

const cvData: CVData = {
  personalInfo: {
    name: "Juan Ignacio Strack",
    title: "DevOps Engineer | Cloud & Automation Enthusiast",
    email: "juanstrack@gmail.com",
    phone: "patos.mates",
    linkedin: "https://www.linkedin.com/in/strack-juan/",
    location: "Argentina",
  },
  summary:
    "DevOps Engineer with hands-on experience in CI/CD pipelines, automation with PowerShell, and cloud resource management in Azure. Skilled in monitoring applications with Azure Monitor and App Insights, and managing code with Git/Azure Repos. Passionate about Infrastructure as Code (IaC), containerization, and cloud observability. Adept at solving complex problems, communicating effectively in bilingual environments, and continuously improving technical workflows.",
  experience: [
    {
      title: "DevOps Engineer",
      company: "Arroyo Consulting",
      period: "Oct 2022 – Present",
      responsibilities: [
        "Designed and maintained CI/CD pipelines in Azure DevOps (YAML)",
        "Automated the provisioning and configuration of Azure resources using ARM templates",
        "Developed and updated automation scripts with PowerShell",
        "Monitored and troubleshooted applications with Azure Monitor and App Insights",
        "Managed source code using Git/Azure Repos (branching strategies, pull requests, code reviews)",
        "Documented processes and tools for cross-functional teams",
        "Provide support to QA and Development teams",
      ],
    },
    {
      title: "Shopkeeper",
      company: "Pescadería Santiago",
      period: "Mar 2020 – Aug 2021",
      responsibilities: [
        "Handled cash flow, schedules, and customer service",
        "Developed responsibility, organizational and interpersonal skills",
      ],
    },
  ],
  education: [
    {
      degree: "Bootcamp: DevOps Engineer",
      institution: "EducaciónIT, Argentina",
      year: "2022",
    },
  ],
  certifications: ["IBM Cloud Essentials (2022)", "Oracle Infrastructure Associate (2022)", "Docker Essentials (2022)"],
  technicalSkills: [
    "Azure DevOps (CI/CD)",
    "PowerShell",
    "ARM Templates",
    "Infrastructure as Code (IaC)",
    "Git / Azure Repos",
    "Docker",
    "Application Insights",
    "Azure Monitor",
  ],
  softSkills: ["Collaboration", "Critical Thinking", "Communication", "Teamwork"],
  languages: [
    { language: "Spanish", level: "Native" },
    { language: "English", level: "Advanced" },
  ],
}

const filesystem = {
  "/home/jstrack": {
    type: "directory",
    contents: ["experience", "skills", "education", "projects", "contact.txt", "about.txt"],
  },
  "/home/jstrack/experience": {
    type: "directory",
    contents: ["arroyo-consulting.txt", "pescaderia-santiago.txt"],
  },
  "/home/jstrack/skills": {
    type: "directory",
    contents: ["technical.txt", "soft-skills.txt", "certifications.txt"],
  },
  "/home/jstrack/education": {
    type: "directory",
    contents: ["bootcamp.txt", "certifications.txt"],
  },
  "/home/jstrack/projects": {
    type: "directory",
    contents: ["ci-cd-pipelines.txt", "azure-automation.txt", "monitoring-setup.txt"],
  },
}

const fileContents = {
  "/home/jstrack/contact.txt": [
    "=== CONTACT INFORMATION ===",
    `Name: ${cvData.personalInfo.name}`,
    `Email: ${cvData.personalInfo.email}`,
    `Discord: ${cvData.personalInfo.phone}`,
    `LinkedIn: ${cvData.personalInfo.linkedin}`,
    `Location: ${cvData.personalInfo.location}`,
    "",
  ],
  "/home/jstrack/about.txt": ["=== ABOUT ME ===", cvData.summary, ""],
  "/home/jstrack/experience/arroyo-consulting.txt": [
    "=== ARROYO CONSULTING ===",
    `Position: ${cvData.experience[0].title}`,
    `Period: ${cvData.experience[0].period}`,
    "",
    "Key Responsibilities:",
    ...cvData.experience[0].responsibilities.map((resp) => `• ${resp}`),
    "",
  ],
  "/home/jstrack/experience/pescaderia-santiago.txt": [
    "=== PESCADERÍA SANTIAGO ===",
    `Position: ${cvData.experience[1].title}`,
    `Period: ${cvData.experience[1].period}`,
    "",
    "Key Responsibilities:",
    ...cvData.experience[1].responsibilities.map((resp) => `• ${resp}`),
    "",
  ],
  "/home/jstrack/skills/technical.txt": [
    "=== TECHNICAL SKILLS ===",
    ...cvData.technicalSkills.map((skill) => `• ${skill}`),
    "",
  ],
  "/home/jstrack/skills/soft-skills.txt": [
    "=== SOFT SKILLS ===",
    ...cvData.softSkills.map((skill) => `• ${skill}`),
    "",
  ],
  "/home/jstrack/skills/certifications.txt": [
    "=== CERTIFICATIONS ===",
    ...cvData.certifications.map((cert) => `• ${cert}`),
    "",
  ],
  "/home/jstrack/education/bootcamp.txt": [
    "=== EDUCATION ===",
    `${cvData.education[0].degree}`,
    `Institution: ${cvData.education[0].institution}`,
    `Year: ${cvData.education[0].year}`,
    "",
  ],
  "/home/jstrack/projects/ci-cd-pipelines.txt": [
    "=== CI/CD PIPELINES PROJECT ===",
    "Designed and maintained CI/CD pipelines in Azure DevOps using YAML",
    "• Automated build, test, and deployment processes",
    "• Implemented branching strategies and pull request workflows",
    "• Reduced deployment time by 60% through automation",
    "",
  ],
  "/home/jstrack/projects/azure-automation.txt": [
    "=== AZURE AUTOMATION PROJECT ===",
    "Automated provisioning and configuration of Azure resources",
    "• Created ARM templates for infrastructure as code",
    "• Developed PowerShell scripts for resource management",
    "• Implemented automated scaling and monitoring",
    "",
  ],
  "/home/jstrack/projects/monitoring-setup.txt": [
    "=== MONITORING SETUP PROJECT ===",
    "Implemented comprehensive monitoring with Azure Monitor and App Insights",
    "• Set up custom dashboards and alerts",
    "• Created automated incident response workflows",
    "• Improved system observability and reduced MTTR by 40%",
    "",
  ],
}

export default function InteractiveCV() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to Juan Ignacio Strack's Interactive CV Terminal",
    "Type 'help' to see available commands",
    "",
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [currentSection, setCurrentSection] = useState("welcome")
  const [currentDirectory, setCurrentDirectory] = useState("/home/jstrack")
  const [dynamicFilesystem, setDynamicFilesystem] = useState(filesystem)
  const [dynamicFileContents, setDynamicFileContents] = useState(fileContents)
  const [editorMode, setEditorMode] = useState<{
    active: boolean
    file: string
    content: string[]
    editor: "vim" | "nano"
  }>({
    active: false,
    file: "",
    content: [],
    editor: "vim",
  })
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  const commands = {
    help: () => [
      "Available commands:",
      "  about       - Show professional summary",
      "  experience  - Display work experience",
      "  skills      - List technical skills",
      "  education   - Show education and certifications",
      "  contact     - Display contact information",
      "  whoami      - Show current user info",
      "  pwd         - Show current directory",
      "  ls          - List directory contents",
      "  cd <dir>    - Change directory",
      "  cat <file>  - Display file contents",
      "  touch <file> - Create empty file",
      "  mkdir <dir> - Create directory",
      "  echo <text> - Display text (use > file to redirect)",
      "  rm <file>   - Remove file",
      "  rmdir <dir> - Remove empty directory",
      "  vim <file>  - Edit file with vim",
      "  nano <file> - Edit file with nano",
      "  clear       - Clear terminal",
      "",
    ],
    about: () => ["=== PROFESSIONAL SUMMARY ===", cvData.summary, ""],
    experience: () => {
      const output = ["=== WORK EXPERIENCE ==="]
      cvData.experience.forEach((exp, index) => {
        output.push(`${index + 1}. ${exp.title} @ ${exp.company}`)
        output.push(`   Period: ${exp.period}`)
        output.push("   Responsibilities:")
        exp.responsibilities.forEach((resp) => {
          output.push(`   • ${resp}`)
        })
        output.push("")
      })
      return output
    },
    skills: () => {
      const output = [
        "=== TECHNICAL SKILLS ===",
        cvData.technicalSkills.join(" | "),
        "",
        "=== SOFT SKILLS ===",
        cvData.softSkills.join(" | "),
        "",
      ]
      return output
    },
    education: () => {
      const output = ["=== EDUCATION ==="]
      cvData.education.forEach((edu) => {
        output.push(`${edu.degree} - ${edu.institution} (${edu.year})`)
      })
      output.push("")
      output.push("=== CERTIFICATIONS ===")
      cvData.certifications.forEach((cert) => {
        output.push(`• ${cert}`)
      })
      output.push("")
      return output
    },
    contact: () => [
      "=== CONTACT INFORMATION ===",
      `Name: ${cvData.personalInfo.name}`,
      `Email: ${cvData.personalInfo.email}`,
      `Discord: ${cvData.personalInfo.phone}`,
      `LinkedIn: ${cvData.personalInfo.linkedin}`,
      `Location: ${cvData.personalInfo.location}`,
      "",
    ],
    whoami: () => [`${cvData.personalInfo.name} - ${cvData.personalInfo.title}`, ""],
    pwd: () => [currentDirectory, ""],
    ls: () => {
      const currentDir = dynamicFilesystem[currentDirectory as keyof typeof dynamicFilesystem]
      if (currentDir && currentDir.type === "directory") {
        const contents = currentDir.contents.map((item) => {
          const itemPath = `${currentDirectory}/${item}`
          const itemData = dynamicFilesystem[itemPath as keyof typeof dynamicFilesystem]
          return itemData?.type === "directory" ? `${item}/` : item
        })
        return [...contents, ""]
      }
      return ["Directory not found", ""]
    },
    vim: (args: string[]) => {
      if (args.length === 0) {
        return ["vim: missing file operand", ""]
      }

      const filename = args[0]
      let filePath: string

      if (filename.startsWith("/")) {
        filePath = filename
      } else {
        filePath = currentDirectory === "/" ? `/${filename}` : `${currentDirectory}/${filename}`
      }

      const existingContent = dynamicFileContents[filePath as keyof typeof dynamicFileContents] || [""]

      setEditorMode({
        active: true,
        file: filePath,
        content: [...existingContent],
        editor: "vim",
      })

      return []
    },
    nano: (args: string[]) => {
      if (args.length === 0) {
        return ["nano: missing file operand", ""]
      }

      const filename = args[0]
      let filePath: string

      if (filename.startsWith("/")) {
        filePath = filename
      } else {
        filePath = currentDirectory === "/" ? `/${filename}` : `${currentDirectory}/${filename}`
      }

      const existingContent = dynamicFileContents[filePath as keyof typeof dynamicFileContents] || [""]

      setEditorMode({
        active: true,
        file: filePath,
        content: [...existingContent],
        editor: "nano",
      })

      return []
    },
  }

  const handleTouchCommand = (args: string[]) => {
    if (args.length === 0) {
      return ["touch: missing file operand", ""]
    }

    const filename = args[0]
    let filePath: string

    if (filename.startsWith("/")) {
      filePath = filename
    } else {
      filePath = currentDirectory === "/" ? `/${filename}` : `${currentDirectory}/${filename}`
    }

    if (dynamicFileContents[filePath as keyof typeof dynamicFileContents]) {
      return [`touch: '${filename}' file already exists`, ""]
    }

    const newFileContents = { ...dynamicFileContents }
    newFileContents[filePath as keyof typeof newFileContents] = [""]
    setDynamicFileContents(newFileContents)

    const newFilesystem = { ...dynamicFilesystem }
    const currentDir = newFilesystem[currentDirectory as keyof typeof newFilesystem]
    if (currentDir && currentDir.type === "directory") {
      currentDir.contents = [...currentDir.contents, filename]
    }
    setDynamicFilesystem(newFilesystem)

    return [`File '${filename}' created`, ""]
  }

  const handleMkdirCommand = (args: string[]) => {
    if (args.length === 0) {
      return ["mkdir: missing operand", ""]
    }

    const dirname = args[0]
    let dirPath: string

    if (dirname.startsWith("/")) {
      dirPath = dirname
    } else {
      dirPath = currentDirectory === "/" ? `/${dirname}` : `${currentDirectory}/${dirname}`
    }

    if (dynamicFilesystem[dirPath as keyof typeof dynamicFilesystem]) {
      return [`mkdir: cannot create directory '${dirname}': File exists`, ""]
    }

    const newFilesystem = { ...dynamicFilesystem }
    newFilesystem[dirPath as keyof typeof newFilesystem] = {
      type: "directory",
      contents: [],
    }

    const currentDir = newFilesystem[currentDirectory as keyof typeof newFilesystem]
    if (currentDir && currentDir.type === "directory") {
      currentDir.contents = [...currentDir.contents, dirname]
    }
    setDynamicFilesystem(newFilesystem)

    return [`Directory '${dirname}' created`, ""]
  }

  const handleEchoCommand = (args: string[]) => {
    if (args.length === 0) {
      return ["", ""]
    }

    const text = args.join(" ")
    const redirectIndex = args.indexOf(">")

    if (redirectIndex !== -1 && redirectIndex < args.length - 1) {
      const filename = args[redirectIndex + 1]
      const content = args.slice(0, redirectIndex).join(" ")

      let filePath: string
      if (filename.startsWith("/")) {
        filePath = filename
      } else {
        filePath = currentDirectory === "/" ? `/${filename}` : `${currentDirectory}/${filename}`
      }

      const newFileContents = { ...dynamicFileContents }
      newFileContents[filePath as keyof typeof newFileContents] = [content, ""]
      setDynamicFileContents(newFileContents)

      const currentDir = dynamicFilesystem[currentDirectory as keyof typeof dynamicFilesystem]
      if (currentDir && currentDir.type === "directory" && !currentDir.contents.includes(filename)) {
        currentDir.contents = [...currentDir.contents, filename]
        setDynamicFilesystem(dynamicFilesystem)
      }

      return [`Content written to '${filename}'`, ""]
    } else {
      return [text, ""]
    }
  }

  const handleRmCommand = (args: string[]) => {
    if (args.length > 0 && args[0] === "-rf") {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {})
      }
      return ["very funny... 🤡", ""]
    }

    if (args.length === 0) {
      return ["rm: missing operand", ""]
    }

    const filename = args[0]
    let filePath: string

    if (filename.startsWith("/")) {
      filePath = filename
    } else {
      filePath = currentDirectory === "/" ? `/${filename}` : `${currentDirectory}/${filename}`
    }

    if (!dynamicFileContents[filePath as keyof typeof dynamicFileContents]) {
      return [`rm: cannot remove '${filename}': No such file or directory`, ""]
    }

    const newFileContents = { ...dynamicFileContents }
    delete newFileContents[filePath as keyof typeof newFileContents]
    setDynamicFileContents(newFileContents)

    const newFilesystem = { ...dynamicFilesystem }
    const currentDir = newFilesystem[currentDirectory as keyof typeof newFilesystem]
    if (currentDir && currentDir.type === "directory") {
      currentDir.contents = currentDir.contents.filter((item) => item !== filename)
    }
    setDynamicFilesystem(newFilesystem)

    return [`File '${filename}' removed`, ""]
  }

  const handleRmdirCommand = (args: string[]) => {
    if (args.length === 0) {
      return ["rmdir: missing operand", ""]
    }

    const dirname = args[0]
    let dirPath: string

    if (dirname.startsWith("/")) {
      dirPath = dirname
    } else {
      dirPath = currentDirectory === "/" ? `/${dirname}` : `${currentDirectory}/${dirname}`
    }

    const targetDir = dynamicFilesystem[dirPath as keyof typeof dynamicFilesystem]

    if (!targetDir) {
      return [`rmdir: failed to remove '${dirname}': No such file or directory`, ""]
    }

    if (targetDir.type !== "directory") {
      return [`rmdir: failed to remove '${dirname}': Not a directory`, ""]
    }

    if (targetDir.contents.length > 0) {
      return [`rmdir: failed to remove '${dirname}': Directory not empty`, ""]
    }

    const newFilesystem = { ...dynamicFilesystem }
    delete newFilesystem[dirPath as keyof typeof newFilesystem]

    const currentDir = newFilesystem[currentDirectory as keyof typeof newFilesystem]
    if (currentDir && currentDir.type === "directory") {
      currentDir.contents = currentDir.contents.filter((item) => item !== dirname)
    }
    setDynamicFilesystem(newFilesystem)

    return [`Directory '${dirname}' removed`, ""]
  }

  const handleCdCommand = (args: string[]) => {
    if (args.length === 0) {
      setCurrentDirectory("/home/jstrack")
      return ["", ""]
    }

    const targetDir = args[0]
    let newPath: string

    if (targetDir === "..") {
      const pathParts = currentDirectory.split("/").filter((part) => part !== "")
      if (pathParts.length > 2) {
        pathParts.pop()
        newPath = "/" + pathParts.join("/")
      } else {
        newPath = "/home/jstrack"
      }
    } else if (targetDir.startsWith("/")) {
      newPath = targetDir
    } else {
      newPath = currentDirectory === "/" ? `/${targetDir}` : `${currentDirectory}/${targetDir}`
    }

    const targetDirData = dynamicFilesystem[newPath as keyof typeof dynamicFilesystem]
    if (targetDirData && targetDirData.type === "directory") {
      setCurrentDirectory(newPath)
      return ["", ""]
    } else {
      return [`cd: ${targetDir}: No such file or directory`, ""]
    }
  }

  const handleCatCommand = (args: string[]) => {
    if (args.length === 0) {
      return ["cat: missing file operand", "Try 'cat <filename>'", ""]
    }

    const filename = args[0]
    let filePath: string

    if (filename.startsWith("/")) {
      filePath = filename
    } else {
      filePath = currentDirectory === "/" ? `/${filename}` : `${currentDirectory}/${filename}`
    }

    const fileContent = dynamicFileContents[filePath as keyof typeof dynamicFileContents]
    if (fileContent) {
      return [...fileContent]
    } else {
      return [`cat: ${filename}: No such file or directory`, ""]
    }
  }

  const saveAndExitEditor = () => {
    const newFileContents = { ...dynamicFileContents }
    newFileContents[editorMode.file as keyof typeof newFileContents] = editorMode.content
    setDynamicFileContents(newFileContents)

    const filename = editorMode.file.split("/").pop() || ""
    const currentDir = dynamicFilesystem[currentDirectory as keyof typeof dynamicFilesystem]
    if (currentDir && currentDir.type === "directory" && !currentDir.contents.includes(filename)) {
      currentDir.contents = [...currentDir.contents, filename]
      setDynamicFilesystem(dynamicFilesystem)
    }

    const newOutput = [...terminalOutput, `File '${editorMode.file}' saved and closed`]
    setTerminalOutput(newOutput)

    setEditorMode({ active: false, file: "", content: [], editor: "vim" })
  }

  const exitEditorWithoutSaving = () => {
    const newOutput = [...terminalOutput, `Editor closed without saving`]
    setTerminalOutput(newOutput)
    setEditorMode({ active: false, file: "", content: [], editor: "vim" })
  }

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    const parts = cmd.split(" ")
    const baseCommand = parts[0]
    const args = parts.slice(1)

    if (baseCommand === "clear") {
      setTerminalOutput([])
      return
    }

    const newOutput = [...terminalOutput, `jstrack@devops-cv:${currentDirectory}$ ${command}`]

    if (baseCommand === "cd") {
      const result = handleCdCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "cat") {
      const result = handleCatCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "touch") {
      const result = handleTouchCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "mkdir") {
      const result = handleMkdirCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "echo") {
      const result = handleEchoCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "rm") {
      const result = handleRmCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "rmdir") {
      const result = handleRmdirCommand(args)
      newOutput.push(...result)
    } else if (baseCommand === "vim") {
      const result = commands.vim(args)
      newOutput.push(...result)
    } else if (baseCommand === "nano") {
      const result = commands.nano(args)
      newOutput.push(...result)
    } else if (baseCommand === "ls") {
      const currentDir = dynamicFilesystem[currentDirectory as keyof typeof dynamicFilesystem]
      if (currentDir && currentDir.type === "directory") {
        const contents = currentDir.contents.map((item) => {
          const itemPath = `${currentDirectory}/${item}`
          const itemData = dynamicFilesystem[itemPath as keyof typeof dynamicFilesystem]
          return itemData?.type === "directory" ? `${item}/` : item
        })
        newOutput.push(...contents, "")
      } else {
        newOutput.push("Directory not found", "")
      }
    } else if (commands[baseCommand as keyof typeof commands]) {
      const result = commands[baseCommand as keyof typeof commands]()
      newOutput.push(...result)
    } else if (cmd === "") {
    } else {
      newOutput.push(`bash: ${baseCommand}: command not found`, "")
    }

    setTerminalOutput(newOutput)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (editorMode.active) {
      if (e.key === "Escape") {
        if (editorMode.editor === "vim") {
          const newOutput = [...terminalOutput, "VIM: Press Ctrl+S to save, Ctrl+Q to quit without saving"]
          setTerminalOutput(newOutput)
        }
      } else if (e.ctrlKey && e.key === "s") {
        e.preventDefault()
        saveAndExitEditor()
      } else if (e.ctrlKey && e.key === "q") {
        e.preventDefault()
        exitEditorWithoutSaving()
      } else if (e.ctrlKey && e.key === "x" && editorMode.editor === "nano") {
        e.preventDefault()
        saveAndExitEditor()
      }
      return
    }

    if (e.key === "Enter") {
      handleCommand(currentInput)
      setCurrentInput("")
    }
  }

  const updateEditorContent = (newContent: string) => {
    setEditorMode((prev) => ({
      ...prev,
      content: newContent.split("\n"),
    }))
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className="min-h-screen bg-background">
      <audio ref={audioRef} preload="auto">
        <source src="/placeholder.mp3?query=circus clown song funny carnival music" type="audio/mpeg" />
      </audio>

      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Terminal className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{cvData.personalInfo.name}</h1>
                <p className="text-lg text-muted-foreground">{cvData.personalInfo.title}</p>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={toggleDarkMode} className="ml-auto bg-transparent">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                {editorMode.active
                  ? `${editorMode.editor.toUpperCase()} Editor - ${editorMode.file}`
                  : "Interactive Terminal"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {editorMode.active ? (
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 bg-black text-green-400 p-4 rounded font-mono text-sm mb-4">
                    <div className="text-yellow-400 mb-2">
                      {editorMode.editor === "vim"
                        ? "-- INSERT MODE -- (Ctrl+S: Save & Exit, Ctrl+Q: Quit without saving)"
                        : "GNU nano - (Ctrl+X: Exit, Ctrl+S: Save)"}
                    </div>
                    <textarea
                      value={editorMode.content.join("\n")}
                      onChange={(e) => updateEditorContent(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full h-full bg-transparent border-none outline-none text-green-400 resize-none"
                      style={{
                        fontFamily:
                          'Ubuntu Mono, "DejaVu Sans Mono", "Liberation Mono", Consolas, "Courier New", monospace',
                      }}
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={saveAndExitEditor}>
                      Save & Exit
                    </Button>
                    <Button variant="outline" size="sm" onClick={exitEditorWithoutSaving}>
                      Exit without saving
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    ref={terminalRef}
                    className="flex-1 bg-black text-green-400 p-4 rounded font-mono text-sm overflow-y-auto mb-4 max-h-[400px] h-[400px]"
                    style={{
                      fontFamily:
                        'Ubuntu Mono, "DejaVu Sans Mono", "Liberation Mono", Consolas, "Courier New", monospace',
                    }}
                  >
                    {terminalOutput.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))}
                    <div className="flex items-center">
                      <span className="text-green-400">jstrack@devops-cv:{currentDirectory}$ </span>
                      <input
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-transparent border-none outline-none text-green-400 flex-1 ml-1"
                        placeholder="Type a command..."
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["help", "about", "experience", "skills", "education", "contact", "clear"].map((cmd) => (
                      <Button
                        key={cmd}
                        variant="outline"
                        size="sm"
                        onClick={() => handleCommand(cmd)}
                        className="text-xs"
                      >
                        {cmd}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cvData.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cvData.personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={cvData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{cvData.personalInfo.location}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cvData.technicalSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Current Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold">{cvData.experience[0].title}</h3>
                  <p className="text-sm text-muted-foreground">{cvData.experience[0].company}</p>
                  <p className="text-sm text-muted-foreground">{cvData.experience[0].period}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cvData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-sm">{lang.language}</span>
                      <Badge variant="outline" className="text-xs">
                        {lang.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Interactive CV built with Next.js and TypeScript • Try the terminal commands above!</p>
        </footer>
      </div>
    </div>
  )
}
