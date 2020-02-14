require 'open3'
require 'pry'
require 'time'

command = "git grep -irz '@expires \\w'"
Open3.popen3(command) do |stdin, stdout, stderr, wait_thr|
  files_with_dates = stdout.read

  files_with_dates.split("\n").each do |file_with_date|
    filename, date = file_with_date.split("# @expires")
    end_of_life = Time.parse(date)

    if Time.now < end_of_life
      puts "Skipping #{filename} - #{end_of_life} has not passed"
      next
    end

    puts "About to edit #{filename} because #{end_of_life} has passed"
  end
  #
  # File.open(filename, 'r+') do |file|
  #   while line = f1.gets
  #     puts line
  #   end
  # end
end
