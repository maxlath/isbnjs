#!/usr/bin/perl
# isbn-groups.js maker
use strict;
use warnings;

use JSON;
use LWP::UserAgent;
use Time::Piece;
use XML::LibXML;

my $ua = LWP::UserAgent->new;
my $json = JSON->new;

# Request a range file
my $resp = $ua->post('https://www.isbn-international.org/?q=bl_proxy/GetRangeInformations', {
  format => 1,
  language => 'en',
  translatedTexts => 'Printed;Last Change'
});
$resp->is_success
  or die $resp->status_line;

# Parse the request info
my $req_info = $json->decode($resp->decoded_content);
$req_info->{'status'} eq 'success'
  or die 'Initial request was not a success';

# Download the range file
$resp = $ua->get(sprintf('https://www.isbn-international.org/?q=download_range/%s/%s', $req_info->{'result'}{'value'}, $req_info->{'result'}{'filename'}));
$resp->is_success
  or die $resp->status_line;

# Parse the range file
my $parser = XML::LibXML->new;
my $dom  = $parser->load_xml(
  string => $resp->decoded_content
);

# Get the updated time from the file
my $t = Time::Piece->strptime($dom->find('//MessageDate')->to_literal()->value(), '%a, %d %b %Y %T CEST');
my $v = $t->strftime('%Y%m%d');

# Get the ranges for 978* ISBNs
my $areas = {};
foreach ($dom->findnodes('//Group[starts-with(Prefix, "978")]')) {
  # Get the name of the group
  my @prefix = split /-/, $_->find('Prefix');
  my $agency = $_->find('Agency')->to_literal()->value();
  $areas->{$prefix[1]} = {
    name => $agency,
    ranges => []
  };

  # Get all the non-empty ranges for the group
  my @rules = $_->findnodes('Rules/Rule');
  foreach (@rules) {
    my $length = $_->find('Length')->to_literal()->value();
    
    if ($length > 0) {
      my $range =  [map { substr $_, 0, $length } split /-/, $_->find('Range')];
      push $areas->{$prefix[1]}->{'ranges'}, $range;
    }
  }
}

# Print the JavaScript file
my $g = $json->utf8->canonical->encode($areas);

$g =~ s/^{/$&\n  /g;
$g =~ s/}}$/\n  }\n}/g;

$g =~ s/"(\d+)":/ $1:/g;
$g =~ s/"(name)":/$1:/g;
$g =~ s/"(ranges)"/\n    $1/g;
$g =~ s/"([\w\s\.,]+)"/'$1'/g;

$g =~ s/:{/$&\n    /g;
$g =~ s/:/$& /g;
$g =~ s/},/\n  $&\n /g;

$g =~ s/\[\[/[\n      [/g;
$g =~ s/\]\]/]\n    ]/g;
$g =~ s/\],/\],\n      /g;

$g =~ s/','/', '/g;

print $g;