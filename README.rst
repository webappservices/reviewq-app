ReviewQ
-------

Plone Review Queue App.

Powered by `Ionic`_ (+ `Angular 2`_)

Requires plone.restapi_ to be installed in your Plone site.

Prerequisites
=============

* NodeJS_

  .. code:: sh

     [apt | brew] install node

* `Node Version Manager`_

  .. code:: sh

     See https://github.com/creationix/nvm#installation

* Yarn_

  .. code:: sh

     [apt | brew] install yarn

* `Apache Cordova`_

  .. code:: sh

     npm install -g cordova

* `Ionic`_ CLI v3

  .. code:: sh

     npm install -g ionic@latest


Installation
============

#. Check out the repo:

   .. code:: sh

      git clone git@github.com:webappservices/reviewq-app.git

#. Install node dependencies

   .. code:: sh

      cd reviewq-app
      # Activate correct node version
      nvm use
      make

#. Build and Serve

   .. code:: sh

      ionic serve -c


.. _`Ionic`: http://ionicframework.com/docs/v2/
.. _`Angular 2`: https://angular.io/
.. _NodeJS: https://nodejs.org/
.. _`Node Version Manager`: https://github.com/creationix/nvm
.. _Yarn: https://yarnpkg.com/en/
.. _`Apache Cordova`: https://cordova.apache.org/
.. _plone.restapi: http://plonerestapi.readthedocs.io/
