llama-server.exe ^
  -m Opus4.7-Distill-GODsGhost-Codex-4B-Q5_K_M.gguf ^
  -c 40000 ^
  -ngl all ^
  -t 12 ^
  -tb 12 ^
  -fa auto ^
  -np 1 ^
  --host 127.0.0.1 ^
  --port 8080