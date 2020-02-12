lane :context do |options|
  puts "Running lane context with options "
  lanes = options[:lanes]
  puts lanes
  eval(lanes)
  # [one(param: 'value')]
end

lane :one do |options|
  puts "called one lane from context lane yahoo!"
  puts options
end