# VeltriX Mold Cost Android TWA

This is the Android Trusted Web Activity wrapper for the public VeltriX Mold Cost PWA. The release configuration targets package `com.veltrix.moldcost` and the deployed `veltrix-mold-cost.ali-fayyazi439.workers.dev` origin.

The `mold-cost-android-build` GitHub Actions workflow builds an unsigned, zip-aligned release APK on an x86-64 runner because Android's native AAPT2 and zipalign binaries in the available SDK are x86-64. The release keystore and its password are intentionally kept off GitHub; signing is performed locally after downloading the artifact.
