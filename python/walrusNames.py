# From the input stream (string), use walrus operator := to initialize 'name'
names = ["Jack", "Jill", "Dummy"]
if (name := input("Enter a name: ")) in names:
  print(f"Hello, {name}!")
else:
  print("Name not found.")
