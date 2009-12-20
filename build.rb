#!/usr/bin/env ruby

require 'uri'
require 'net/http'

CLOSURE_COMPILER_URL = 'http://closure-compiler.appspot.com/compile'

files = Dir.glob(File.join(File.dirname(__FILE__), 'src', '*.js'))
source = files.inject('') do |source, file|
  source << File.read(file)
end

body, out = nil, nil
if ARGV.shift == '--minify'
  body = Net::HTTP.post_form(URI.parse(CLOSURE_COMPILER_URL),
                             :js_code => source,
                             :compilation_level => 'SIMPLE_OPTIMIZATIONS',
                             :output_info => 'compiled_code').body
  out = 'traer.physics.min.js'
else
  body = source
  out = 'traer.physics.js'
end

output = File.open(out, 'w')
output.puts(body)
output.close
