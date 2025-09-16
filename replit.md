# Text Analyzer Application

## Overview

This is a web-based text analyzer application that provides real-time statistics for text input. Built with Flask for the backend and vanilla JavaScript for the frontend, it calculates word count, character count, reading time, paragraphs, and sentences in Russian language interface. The application features a clean, dark-themed Bootstrap UI optimized for the Replit environment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Template Engine**: Flask's Jinja2 templating system for server-side rendering
- **UI Framework**: Bootstrap 5 with Replit's dark theme variant for consistent styling
- **JavaScript**: Vanilla JavaScript with a class-based TextAnalyzer component for real-time text analysis
- **Styling**: Custom CSS with smooth transitions and responsive design

### Backend Architecture
- **Web Framework**: Flask with minimal configuration for simplicity
- **Session Management**: Secret key configuration for session security (environment-based with fallback)
- **Application Structure**: Single-file Flask application with template rendering
- **Routing**: Single route serving the main application page

### Design Patterns
- **MVC Pattern**: Clear separation between Flask backend (controller), HTML templates (view), and JavaScript classes (model/logic)
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with real-time features
- **Component-Based Frontend**: TextAnalyzer class encapsulates all text analysis logic and DOM interactions

### Development Configuration
- **Environment**: Configured for Replit hosting with host='0.0.0.0' and port 5000
- **Debug Mode**: Enabled for development with hot reloading
- **Static Assets**: Organized in standard Flask structure with separate CSS and JS files

## External Dependencies

### CDN Resources
- **Bootstrap CSS**: Replit-specific dark theme variant from cdn.replit.com
- **Font Awesome**: Version 6.4.0 for iconography from cdnjs.cloudflare.com

### Python Dependencies
- **Flask**: Core web framework for routing and templating
- **OS Module**: For environment variable access (session secret management)

### Browser APIs
- **DOM Manipulation**: Native JavaScript for real-time text analysis
- **Event Handling**: Keyboard shortcuts and input event processing
- **Local Storage**: Potential future enhancement for saving user preferences