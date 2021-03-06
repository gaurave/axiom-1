// Copyright (c) 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Prepares distributions with proper package.json files

module.exports = function(grunt) {
  grunt.registerMultiTask('make_package_json', function() {
    var version = this.options().version;

    this.files.forEach(function(file) {
      grunt.log.writeln("dest " + file.orig.dest);
      var destPath = file.orig.dest;
      var packageDist = grunt.file.readJSON(file.orig.src);
      packageDist.version = version;
      grunt.file.write(destPath, JSON.stringify(packageDist, null, 2));
    });
  });
};
