# ElectronSafe
ElectronSafe is a desktop application built with Electron and React that leverages the command-line interface of Veracrypt to provide a user-friendly graphical user interface for creating and mounting encrypted containers. 

## Screenshots

### Create an encrypted container

![create container screenshot](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/create-1.png)

![create container screenshot 2](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/create-2png.png)

![create container screenshot 3](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/create-3.png)

![create container screenshot 4](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/create-4.png)

![create container notification screenshot](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/create-5-notification.png)

### Mount an encrypted container

![mount container empty state screenshot](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/mount-2-form-filled.png)

![mount container screenshot](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/mount-3-mounted.png)

### Settings

![settings screenshot](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/settings.png)

### Light color theme

![light color theme](https://github.com/galletafromjell666/electronSafe/blob/bc051c57767357ba58e50135fbadaf10227e8771/white-theme.png)

## Motivation
The motivation behind this project is to provide a proof of concept for using Electron to interact with CLI tools and give these tools a visually appealing interface without modifying their code. This approach has been successfully implemented in projects like Docker Desktop, where the client is an Electron application.
The project currently functions exclusively on Windows. With minor adjustments, it should be compatible with Linux and macOS.

## Technologies
- React
- Typescript
- nodepty: Utilized for spawning and controlling a terminal within the Node.js environment. It allows the creation of a pseudo-terminal (pty) that can be programmatically read from and written to, enabling direct interaction with command-line tools.
- Electron: Empowers the development of cross-platform desktop applications using JavaScript. By leveraging Electron's main process, we interface with nodepty for terminal operations. Inter-process communication (IPC) events are used to transmit data to the renderer process, where React handles the dynamic UI rendering.
- Tailwind CSS: A highly configurable, utility-first CSS framework that accelerates the styling process by providing low-level utility classes directly in the markup.
- shadcn: A robust component library that offers a collection of accessible, pre-styled components, enhancing the UI development with consistent design patterns and best practices.
- Vite

## Development 
Clone the project
```bash
git clone https://github.com/galletafromjell666/electronSafe.git
```

Move inside the project
```bash
cd electronSafe
```

You will need to install other tools in your system to use node-pty, please read [this section from the node-py documentation](https://github.com/microsoft/node-pty#windows). Once you finish you can continue with the set up:

Install modules
```bash
npm install
```

Run
```bash
npm run dev
```
