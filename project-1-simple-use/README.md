Project todo: 
- User can crud todo entity
- Technologies = nodejs, express, html, css, js, database = one json file

## Structure
- `tasks/` - Task files for incremental development (INPUT/PROCESS/OUTPUT format)
- Each completed task should be reviewed and committed
Each md file is a small task that LLM can done under 1 minute
After a task done then review and commit

Rules for create a task .md file:
- Structure: INPUT, PROCESS, OUTPUT
- Task can be done under 1 minute

When create task 4, it got error context overflow.
- /compact to remove context saved
- /session to view current token use
- Keep an eye in footer to view token left, if AI generating it show number but if done it show ?/total
    ↑11k ↓992 R18k ?/16k (auto)

Using small qwen 3.5 4gb model with pi agent for test task is often exceed 16k context max size.
- Task 4 not done yet