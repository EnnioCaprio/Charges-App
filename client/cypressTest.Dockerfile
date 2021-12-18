FROM cypress/included:8.2.0

RUN npm install @testing-library/cypress

ENV CI=true