# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**December - The Agentic Computer Controller v1** is an Electron-based desktop application designed to create a fully autonomous AI assistant using Claude Code on macOS. The project enables Claude Code to run persistently with complete computer control and persistent memory capabilities.

## Architecture

This is an **Electron + React + TypeScript** application with a clear separation between:

- **Main Process** (`src/main/`): Node.js backend handling system operations, process management, and core services
- **Renderer Process** (`src/renderer/`): React frontend for user interface and monitoring
- **Shared Layer** (`src/shared/`): Common types and utilities used across both processes

### Core Services Architecture

The application is built around these key services in `src/main/services/`:

- **ProcessManager**: Monitors and manages Claude Code instances with auto-restart capabilities
- **MemoryManager**: Handles persistent storage (text files, SQLite, vector database for RAG)
- **TaskManager**: Manages user tasks and AI task completion tracking
- **APIManager**: Integrates external APIs (Grok, OpenAI, Exa AI) with secure key management
- **GitManager**: Automatic git branch management for multi-instance collaboration
- **SystemMonitor**: Resource monitoring and system health checks
- **WebDashboard**: Local web interface for remote monitoring

### Multi-Instance Coordination

The system supports multiple Claude Code instances with one central manager orchestrating:
- Task assignment and resource allocation
- Automatic git branch creation per instance (naming: `claude-instance-{id}-{taskname}-{timestamp}`)
- Conflict prevention and merge coordination
- Specialized role assignment (research, coding, creative work)

## Development Commands

```bash
# Development
npm run dev          # Start both main and renderer with hot reload
npm run dev:main     # Start Electron main process only
npm run dev:renderer # Start React renderer process only

# Production
npm run build        # Build for production
npm run start        # Start built application
npm run dist         # Create distributable packages

# Code Quality
npm run lint         # Run ESLint
npm run test         # Run tests
npm run clean        # Clean build directories
```

## Database Architecture

Three-tier persistent storage system:
- **Text Files**: Simple notes and observations storage
- **SQLite**: Structured data with better-sqlite3 library
- **Vector Database**: LanceDB for RAG capabilities and semantic search

## IPC Communication

Inter-process communication between Electron main and renderer processes handles:
- Process status updates and control commands
- Task management operations
- Memory system queries and updates
- API integration requests
- System monitoring data

## Platform Considerations

- **Primary Target**: macOS (Mac Mini deployment)
- **Cross-Platform**: Designed with OS-specific abstractions for future Windows support
- **System Integration**: Uses native OS APIs through Electron's main process for deep system access

## Key Implementation Patterns

- Service-oriented architecture with clear separation of concerns
- Event-driven communication between services
- Automatic error recovery and restart mechanisms
- Resource monitoring and throttling to prevent system overload
- Kill switch functionality for emergency stops