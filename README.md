# Show10
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/redpeacock78/show10)  

## Overview
Show10 is a web application built using the Deno runtime and the Hono framework. It provides a platform for generating and managing shortened URLs with a focus on modularity, scalability, and modern web development practices.

## Key Features
- **URL Shortening**: Dynamically generates shortened URLs and stores them in a PostgreSQL database.
- **Base62 Encoding**: Converts numeric IDs into Base62 strings for compact and unique URL keys.
- **Snowflake ID Generation**: Ensures globally unique IDs using the Snowflake algorithm.
- **Responsive UI**: Built with React components and styled using Tailwind CSS for a seamless user experience.
- **Clipboard Integration**: Allows users to easily copy shortened URLs to their clipboard.
- **Error Handling**: Displays user-friendly error messages for invalid inputs or system issues.
- **Server-Side Rendering (SSR)**: Utilizes `hono-streaming` to render pages on the server for better performance.

## Project Structure
```
├── .vscode/                # VSCode settings
├── src/                    # Source code
│   ├── app.ts              # Backend server setup
│   ├── app.tsx             # React-based frontend with SSR
│   ├── components/         # UI components
│   │   ├── header.tsx      # Header component
│   │   ├── footer.tsx      # Footer component
│   │   ├── form.tsx        # Form for URL input
│   │   ├── resultTable.tsx # Displays shortened URLs
│   │   └── common/         # Shared components (e.g., loader, alerts)
│   ├── libs/               # Libraries and utilities
│   │   ├── db.ts           # Database operations
│   │   ├── key.ts          # Base62 encoding/decoding
│   │   ├── snowflake.ts    # Unique ID generation
│   │   ├── machineId.ts    # Machine ID generation
│   │   ├── shorter.ts      # URL shortening logic
│   │   └── secrets.ts      # Secret management
│   ├── router/             # API routing
│   │   ├── api/            # API endpoints
│   │   └── common/         # Shared routes
├── tools/                  # Tool scripts
├── import_map.json         # Module mapping
├── scripts.json            # Script configuration
├── deno.json               # Deno configuration file
├── LICENSE                 # License
└── README.md               # This file
```

## Technical Details
- **Backend**: The backend is powered by the Hono framework, with routes defined in `src/router/`. It handles API requests and serves the frontend.
- **Frontend**: The React-based frontend is rendered server-side using `hono-streaming`. Components like `Form`, `ResultTable`, and `ErrorAlert` ensure a dynamic and interactive user experience.
- **Database**: The `Db` module in `src/libs/db.ts` manages database operations, including creating tables for storing shortened URLs and retrieving data.
- **Key Generation**: Unique keys for shortened URLs are generated using the `Key` namespace in `src/libs/key.ts`, which encodes numeric IDs into Base62 strings.
- **Snowflake Algorithm**: The `Snowflake` namespace in `src/libs/snowflake.ts` generates globally unique IDs based on timestamps and machine IDs.
- **Machine ID**: The `MachineId` namespace in `src/libs/machineId.ts` generates a 10-bit machine ID using network information.
- **URL Shortening Logic**: The `Shorter` namespace in `src/libs/shorter.ts` orchestrates the process of generating and storing shortened URLs.

## Requirements
- Deno 1.35.0 or higher
- PostgreSQL database

## How to Run
### Start the Development Server
```bash
$ deno task dev
```
### Start the Server
```bash
$ deno compile -A --no-check --import-map import_map.json -o build/app src/app.ts && chmod +x ./build/app
$ ./build/app
```

## License
This project is licensed under the [MIT License](./LICENSE).

## Contributing
Feel free to report bugs or request features via Issues. Pull requests are also welcome!
