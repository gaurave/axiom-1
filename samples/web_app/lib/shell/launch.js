// Copyright 2015 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import JsFileSystem from 'axiom/fs/js/file_system';
import ExecuteContext from 'axiom/fs/base/execute_context';

import htermMain from 'shell/exe/hterm';
//import washMain from 'shell/exe/wash';

console.log('Lauching app!');

var fs = new JsFileSystem();

// Add executables to new filesystem
fs.rootDirectory.mkdir('exe')
  .then(function( /** JsDirectory */ jsdir) {
    jsdir.install({
      'hterm': htermMain,
      //'wash': washMain,
    });
  })
  .then(function() {
    // Execute "hterm" app, passing "wash" as command line processor
    return fs.createExecuteContext(
      'exe/hterm', {
        command: 'exe/wash',
        arg: { init: true }
      });
  }).then(function (/** ExecutionContext */cx) {
      cx.execute();
  }).catch(function(e) {
    console.log('Error lauching app:', e);
  });
