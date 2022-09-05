:: %1 - url repository
:: %2 - local path to repository folder
if exist %2 (
  cd %2
  git pull %1
) else (
  git clone %1 %2
)