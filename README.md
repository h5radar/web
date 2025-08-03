# H5Radar Web UI

This repository contains the web interface for the H5Radar platform, providing interactive visualization of the technology radar and license compliance data.

H5Radar application consists of several modules. For an overview of the entire platform and its repositories, please see the [organization-level README](https://github.com/h5radar).

## Features

- Interactive technology radar charts
- License compliance dashboards
- User-friendly interface for browsing and filtering technologies
- Integration with backend APIs

## Resources

- [Website](https://www.h5radar.com)
- [Documentation](https://docs.h5radar.com)
- [Live Demo](https://app.h5radar.com)
- [Blog](https://blog.h5radar.com)

## Contributing

Contributions and issues are welcome. Please open pull requests or issues in this repository. For general discussions, roadmap input, and questions, please join our [organization Discussions](https://github.com/orgs/h5radar/discussions). We appreciate community involvement in shaping H5Radar!

## License

This repository is part of the H5Radar project and is licensed under the MIT License.

# Appendix 1: Useful commands

- run server by command: npx http-server ./dist -o -c-1
- run cypress to e2e tests from cmd by command: npx cypress run
- open cypress e2e tests environment by command: npx cypress open
- run bundler analyzer by command: npx vite-bundle-visualizer
- list package to update by command: npx npm-check-updates
- build docker by command: docker build -t h5radar/app:latest .
- run docker by command: docker run -p 80:80 h5radar/app:latest
