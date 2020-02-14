require 'open3'
require 'pry'
require 'time'

command = "git grep -irz '@expire_at \\w'"
Open3.popen3(command) do |stdin, stdout, stderr, wait_thr|
  files_with_dates = stdout.read

  files_with_dates.split("\n").each do |file_with_date|
    filename, date = file_with_date.split("# @expire_at")
    end_of_life = Time.parse(date)

    # NOTE: Not really fussed with time zones since these will be
    # checked in the PR anyway.
    next if Time.now < end_of_life

    puts "About to delete #{filename.strip!} because #{end_of_life} has passed"

    FileUtils.rm filename
  end
end
