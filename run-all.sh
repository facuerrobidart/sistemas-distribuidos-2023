#! /bin/bash
# Este es un script para correr todos los servicios a la vez
# en lugar de correr los servicios por separado

# Buscamos los procesos de Node.js que estan corriendo
# Define the range of ports you want to target
start_port=8079
end_port=8100

# Lista de procesos que pueden estar corriendo
echo "Procesos corriendo entre los puertos $start_port y $end_port:"
for ((port = start_port; port <= end_port; port++)); do
  process_info=$(netstat -ano | grep "LISTENING" | grep ":$port")
  if [ -n "$process_info" ]; then
    process_id=$(echo "$process_info" | awk '{print $5}' | cut -d: -f2)
    process_name=$(tasklist | grep "$process_id" | awk '{print $1}')
    echo "Puerto $port: Process ID - $process_id, Nombre - $process_name"
  fi
done

read -p "Queres matar estos procesos? (y/n): " choice

if [ "$choice" = "y" ]; then
  for ((port = start_port; port <= end_port; port++)); do
    process_info=$(netstat -ano | grep "LISTENING" | grep ":$port")
    if [ -n "$process_info" ]; then
      process_id=$(echo "$process_info" | awk '{print $5}' | cut -d: -f2)
      powershell "Stop-Process -Id $process_id"
      echo "Proceso detenido en puerto: $port."
    fi
  done
else
  echo "No mate ningun proceso."
fi

servicios=("gestion/ascensores/controller.js" "gestion/visitantes/controller.js" "gestion/permisos/controller.js" "api-gateway/index.js")

for i in "${servicios[@]}"
do
    echo "Corriendo servicio $i"
    node $i &
done

echo "Todos los servicios corriendo"
wait