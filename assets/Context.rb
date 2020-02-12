lane :context do |options|
  puts "Running lane context with options "
  lanes = options[:lanes]
  puts lanes
  eval(lanes)
end

lane :one do 
  puts "called one lane from context lane yahoo!"
end