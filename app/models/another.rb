class Another
  def initialize
    puts "WEE"
  end

  def foo
    puts "foo"
  end

  # @expires 2019-03-10
  # @deprecated but not yet deleted
  def bar
    puts "bar"
  end
  # @end_expires

  # @expires 2019-02-10
  # @deprecated but not yet deleted
  def baz
    puts "baz"
  end
  # @end_expires
end
