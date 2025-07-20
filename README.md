# December - The Agentic Computer Controller v1 

- Product Specification

## Mission Statement

Build the first fully agentic computer controller starting with Claude living on a Mac Mini and being able to do whatever it wants and needs.

## Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- macOS (primary target platform)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd computer-use
```

2. Install dependencies
```bash
npm install
```

3. Start development
```bash
# Run in development mode (both main and renderer processes)
npm run dev

# Or run them separately:
npm run dev:main    # Electron main process
npm run dev:renderer # React renderer process
```

4. Build for production
```bash
npm run build
npm run dist        # Create distributable
```

### Project Structure

```
src/
├── main/                 # Electron main process
│   ├── main.ts          # Application entry point
│   ├── preload.ts       # Preload script for IPC
│   └── services/        # Backend services
│       ├── ProcessManager.ts
│       ├── MemoryManager.ts
│       ├── TaskManager.ts
│       ├── APIManager.ts
│       ├── GitManager.ts
│       ├── SystemMonitor.ts
│       └── WebDashboard.ts
├── renderer/            # React frontend
│   ├── index.tsx       # React entry point
│   ├── App.tsx         # Main App component
│   ├── components/     # React components
│   └── styles/         # CSS styles
└── shared/             # Shared types and utilities
    └── types.ts        # TypeScript interfaces
```

### Available Scripts

- `npm run dev` - Start development with hot reload
- `npm run build` - Build for production
- `npm run start` - Start the built application
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run clean` - Clean build directories

## Core Features for v1

### Claude Code Process Management

The app monitors Claude Code processes continuously, providing start/stop/restart functionality through a simple interface. When Claude Code crashes or terminates unexpectedly, the system automatically restarts it within 30 seconds. Users can view real-time status of all Claude Code instances, including uptime, current activity, and resource usage. The app maintains logs of all process events for debugging and monitoring purposes.

### Persistent Memory System

Claude Code gets three types of persistent storage: a simple text file for notes and observations, a local SQLite database for structured data storage, and a local vector database using something like Chroma for RAG capabilities. This lets Claude remember previous conversations, store learned information, and build context over time. The memory system automatically backs up daily and can be manually exported or imported.

### API Integration Hub

The app provides Claude Code with access to external APIs including Grok, OpenAI models, and Exa AI search. Claude can use these for getting second opinions, brainstorming, web searching, and accessing different AI capabilities. All API keys are managed securely through the app, and usage is tracked to prevent overspending. Claude can dynamically choose which API to use based on the task requirements.

### Task Management System

Users can add tasks to a simple to-do list that Claude Code can access and work on. Tasks can be prioritized, have deadlines, and include detailed descriptions or requirements. Claude Code can mark tasks as complete, add progress notes, and even break down complex tasks into subtasks. The system tracks time spent on each task and provides basic analytics.

### Multi-Instance Orchestration

The app can spawn multiple Claude Code instances with one designated as the central manager. The manager Claude oversees other instances, assigns tasks, prevents conflicts, and coordinates shared resources. Each instance can have specialized roles like research, coding, or creative work. The system provides a dashboard showing all active instances and their current activities.

### Automatic Git Branch Management

When multiple Claude Code instances need to work on the same project folder, the app automatically creates separate git branches for each instance to prevent conflicts and maintain code integrity. Before an instance starts working on a project, the system checks if another instance is already active on that folder and creates a new branch with a naming convention like "claude-instance-2-taskname-timestamp". Each instance works in isolation on its own branch, and the central manager Claude can review changes and merge branches when appropriate. The system maintains a branch registry showing which instance is working on which branch, automatically commits changes at regular intervals, and provides conflict resolution guidance when merges are needed. This ensures that multiple AI agents can collaborate on the same codebase without stepping on each other's work while maintaining full version control history.

## Additional v1 Features

### System Integration
- Simple web dashboard accessible locally for monitoring and control when not at the computer
- Basic scheduling capabilities so Claude can work on tasks at specific times or intervals
- File system organization where Claude maintains its own folder structure for projects and outputs
- Integration with git for version control of any code projects Claude creates
- Simple notification system that alerts users when important tasks are completed or when manual intervention is needed
- Basic resource monitoring to ensure Claude doesn't consume too much CPU or memory
- Kill switch that can immediately stop all Claude instances if something goes wrong

## Technology Stack

The app will be built using Electron with React and TypeScript for the frontend, providing a cross-platform desktop application that can easily deploy to both macOS and Windows with minimal platform-specific changes. Node.js will handle the backend processes including Claude Code process management, file system operations, and API integrations. For the database layer, we'll use SQLite with better-sqlite3 for structured data and a JavaScript-based vector database like LanceDB for RAG capabilities. Git operations will be handled through the simple-git library for automated branch management. The app will use native OS APIs through Electron's main process for system-level operations like process monitoring, file permissions, and system notifications. For cross-platform compatibility, we'll abstract OS-specific functionality behind a service layer, making it easy to add Windows-specific implementations later. This stack provides deep system integration capabilities while maintaining the flexibility to build for multiple platforms with shared core logic and UI components.

## Target Platform

- **Primary**: macOS (Mac Mini focus)
- **Future**: Windows support with minimal code changes
- **Architecture**: Cross-platform foundation with OS-specific abstractions.