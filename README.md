# Power Analytics

## Tech Stack

- React 18
- React-Redux with RTKs (redux-toolkit)
- React-Router
- eCharts

## Development

Before running npm command, remember to install NodeJS modules

```sh
npm install
```

Start dev server

```sh
npm run dev
```

## Production

Packing the project source and generating a public static directory by webpack

```sh
npm run build
```

Then hosting the `/public` folder or deploying wherever

## Production with Docker

### Building an image

```sh
docker build <project_path> -t <image_name>
```

### Running via docker-compose

```sh
docker-compose up -d
```

Visit at `http://localhost:9000/`
