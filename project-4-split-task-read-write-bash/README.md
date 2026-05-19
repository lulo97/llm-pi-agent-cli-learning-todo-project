Project todo: 
- User can crud todo entity
- Technologies = nodejs, express, html, css, js, database = one json file

Structure
- `tasks/` - Task files
- Each completed task should be reviewed and committed
- Each md file is a small task that LLM can done under 1 minute

Rules for create a task .md file:
- A task is numbered like 001-write, 001-bash, 002-write, 002-bash, 003-write, 003-bash...
- Structure: INPUT, PROCESS, OUTPUT
- Task can be done under 1 minute
- write task = only read and write, don't run any command
- bash task = only read and run command, don't edit/write any code
- Flow = Agent read previous task and projec files -> Agent gen task write md file -> Agent write code -> Agent gen task bash md file -> Agent run bash command
- If some task only need write phase then bash phrase can be skip

Example: View tasks\example-bash.md and tasks\example-wite.md file